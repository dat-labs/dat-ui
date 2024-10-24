"use client";

import React, { useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CircularLoader from "@/components/ui/circularLoader";
import clsx from "clsx";
import { ErrorAlert } from "@/components/commom/error-alert";
import SectionalComponent from "./input-components/sectional-component";
import TextBox from "./input-components/textbox";
import Integer from "./input-components/integer";
import SingleSelect from "./input-components/single-select";
import TextArray from "./input-components/text-array";
import EnumField from "./input-components/enum-field";
import RadioButton from "./input-components/radio-button";
import FileUpload from "./input-components/file-upload";

/**
 * FormGenerator component to generate form fields based on the properties
 * @param properties
 * @param onSubmit
 * @returns form fields
 */
export default function FormGenerator({
    properties,
    required_fields,
    onSubmit,
    defaultData,
    submitButtonText,
    errorText,
    tabChangeAlert,
    currentTab,
    onUploadResponse,
    existingFiles,
    targetPath,
}: {
    properties: any;
    required_fields?: any;
    onSubmit: any;
    defaultData?: any;
    submitButtonText?: string;
    errorText?: string | null;
    tabChangeAlert?: any;
    currentTab?: any;
    onUploadResponse?: (responses: any) => void;
    existingFiles?: string[];
    targetPath?: string | null;
}) {
    const form = useForm({ defaultValues: defaultData });

    const handleUnregister = useCallback(
        (fieldName) => {
            form.unregister(fieldName);
        },
        [form]
    );

    const checkrequired = (field_name: string) => {
        if (required_fields) {
            return required_fields?.includes(field_name);
        } else {
            return false;
        }
    };

    /**
     * Function to handle form submission
     * @param data
     * @returns form submission
     */
    const onSubmitForm = async (data: any) => {
        try {
            const formState = form.getValues(); 
            const result = await onSubmit(data);
            if (result && result.success === true) {
                form.reset();
            } else {
                form.reset(formState);
            }
        } catch (error) {
           return error;
        }
    };

    useEffect(() => {
        if (currentTab && form.formState.isDirty) {
            const savedValues = form.getValues();
            const confirm = tabChangeAlert(form);
            if (!confirm) {
                form.reset(savedValues);
            }
        }
    }, [currentTab]);

    /**
     * Function to render differnt form fields based on the type of the field
     * @param field
     * @returns form fields
     */
    const renderFormField = (field: any, parentKey?: string) => {
        if (!field) {
            return null;
        }
        let { type, title, description, order, minimum, maximum, examples, oneOf, field_name, hidden } = field;
        if (oneOf === undefined && field?.anyOf) {
            oneOf = field.anyOf;
        }
        let uiOpts = field["ui-opts"];
        let defaultValue = field.default;

        const originalFieldName = field_name;
        field_name = parentKey ? `${parentKey}.${field_name}` : field_name;
        const watchFieldValue = form.watch(`${field_name}.${originalFieldName}`);

        /**
         * Check if the field value has more properties to render and call renderFormField recursively
         * @param watchFieldValue
         * @param oneOf
         * @returns recursive function to render more properties
         */
        const checkIfFieldValueHasMoreProperties = (watchFieldValue: string, oneOf: any) => {
            if (watchFieldValue) {
                const selectedOption = oneOf.find(
                    (option: any) => option.properties[originalFieldName].default === watchFieldValue
                );
                /**
                 * if selected value === current object value
                 */
                if (selectedOption && Object.keys(selectedOption.properties).length >= 1) {
                    Object.keys(selectedOption.properties).forEach((key) => {
                        selectedOption.properties[key].field_name = key;
                    });
                    let depFields = Object.values(selectedOption.properties).filter((field: any) => field?.const === undefined); // remove any object with const in it
                    const sortedDepFields = Object.values(depFields).sort((a: any, b: any) => a.order - b.order); // get sorted fields on order key
                    /**
                     * if there are dependent fields to render
                     * call the render function again
                     * with current field namee as the parent key
                     */
                    if (sortedDepFields && sortedDepFields.length > 0) {
                        return (
                            <div className="flex flex-col space-y-4">
                                {sortedDepFields?.map((dep_field) => dep_field && renderFormField(dep_field, `${field_name}`))}
                            </div>
                        );
                    }
                }
            }
            return null;
        };

        /**
         * render grouping of parameters. For example advanced settings section.
         * Can recursively render as many sections as needed
         */
        if ((type === "object" && oneOf === undefined && field?.properties) || uiOpts?.widget === "group") {
            Object.keys(field.properties).forEach((key) => {
                field.properties[key].field_name = key;
            });
            const sortedProperties = Object.values(field.properties).sort((a: any, b: any) => a.order - b.order);
            return (
                <SectionalComponent
                    title={title}
                    field_name={field_name}
                    sortedProperties={sortedProperties}
                    renderFormField={renderFormField}
                    order={order}
                    type={type}
                    handleUnregister={handleUnregister}
                />
            );
        }

        const isRequired = checkrequired(field_name);

        if (uiOpts?.file_upload) {
            const allowedFileTypes = uiOpts?.allowed_file_types || [];

            return (
                <div key={field_name} className={clsx({ hidden: uiOpts?.hidden === true })}>
                    <span className="text-md font-medium">{title}</span>
                    <FileUpload
                        field_name={field_name}
                        required={isRequired}
                        allowedFileTypes={allowedFileTypes}
                        onUploadResponse={(responses) => {
                            if (onUploadResponse) {
                                onUploadResponse(responses);
                            }
                        }}
                        existingFiles={existingFiles}
                        handleUnregister={handleUnregister}
                        targetPath={targetPath}
                    />
                </div>
            );
        }

        return (
            <div
                key={field_name}
                className={clsx({ "border p-3 rounded-md": type === "object", hidden: uiOpts?.hidden === true })}
            >
                <label htmlFor={field_name} className="flex flex-col space-y-1">
                    <div className="flex gap-1">
                        <span className="text-md font-medium">{title}</span>
                        {isRequired && <span className="text-sm text-red-500">*</span>}
                    </div>

                    {description && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></div>
                    )}

                    {(type === "string" || uiOpts?.widget === "textbox") &&
                        (field.enum ? (
                            <EnumField
                                form={form}
                                field_name={field_name}
                                fieldEnum={field.enum}
                                required={isRequired}
                                handleUnregister={handleUnregister}
                            />
                        ) : (
                            <TextBox
                                field={field}
                                form={form}
                                field_name={field_name}
                                defaultValue={defaultValue}
                                uiOpts={uiOpts}
                                required={isRequired}
                                handleUnregister={handleUnregister}
                            />
                        ))}

                    {type === "integer" && (
                        <Integer
                            field_name={field_name}
                            form={form}
                            minimum={minimum}
                            maximum={maximum}
                            defaultValue={defaultValue}
                            handleUnregister={handleUnregister}
                        />
                    )}

                    {uiOpts?.widget === "singleDropdown" && (
                        <SingleSelect
                            form={form}
                            field_name={field_name}
                            originalFieldName={originalFieldName}
                            oneOf={oneOf}
                            handleUnregister={handleUnregister}
                        />
                    )}

                    {uiOpts?.widget === "radioButton" && (
                        <div className="mt-4">
                            <RadioButton
                                form={form}
                                field_name={field_name}
                                originalFieldName={originalFieldName}
                                oneOf={oneOf}
                                handleUnregister={handleUnregister}
                            />
                        </div>
                    )}

                    {(type === "array" || type === "textboxDelimiterSeparatedChip") && (
                        <TextArray
                            type={type}
                            form={form}
                            field_name={field_name}
                            description={description}
                            defaultValue={defaultValue}
                            required={isRequired}
                            handleUnregister={handleUnregister}
                        />
                    )}

                    {form.formState.errors[field_name] && (
                        <p className="text-sm text-destructive">
                            <>{form.formState.errors[field_name]?.message}</>
                        </p>
                    )}

                    <div className="pl-4">{oneOf && checkIfFieldValueHasMoreProperties(watchFieldValue, oneOf)}</div>
                </label>
            </div>
        );
    };
    Object.keys(properties).forEach((key) => {
        properties[key].field_name = key;
    });
    const sortedProperties = Object.values(properties).sort((a: any, b: any) => a.order - b.order);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col space-y-4">
                {sortedProperties.map((field, index) => (
                    <React.Fragment key={index}>{renderFormField(field)}</React.Fragment>
                ))}

                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <CircularLoader />}
                    {submitButtonText || "Submit"}
                </Button>
            </form>
            {errorText && <ErrorAlert error={errorText} />}
        </Form>
    );
}
