"use client";

import React from "react";
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

/**
 * FormGenerator component to generate form fields based on the properties
 * @param properties
 * @param onSubmit
 * @returns form fields
 */
export default function FormGenerator({
    properties,
    onSubmit,
    defaultData,
    submitButtonText,
    errorText,
}: {
    properties: any;
    onSubmit: any;
    defaultData?: any;
    submitButtonText?: string;
    errorText?: string;
}) {
    const form = useForm({ defaultValues: defaultData });

    /**
     * Function to handle form submission
     * @param data
     * @returns form submission
     */
    const onSubmitForm = async (data: any) => {
        console.log(data);
        await onSubmit(data);
    };

    /**
     * Function to render differnt form fields based on the type of the field
     * @param field
     * @returns form fields
     */
    const renderFormField = (field: any, parentKey?: string) => {
        // return if no field is provided
        if (!field) {
            return null;
        }
        let { type, title, description, order, minimum, maximum, defaultValue, examples, oneOf, field_name, hidden } = field;
        let uiOpts = field["ui-opts"];

        const originalFieldName = field_name; // to store the original field name to be used if needed
        field_name = parentKey ? `${parentKey}.${field_name}` : field_name; // override field name with appended parent key
        const watchFieldValue = form.watch(`${field_name}.${originalFieldName}`); // to watch for value of this field

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
                                <>
                                    {sortedDepFields?.map(
                                        (dep_field) => dep_field && renderFormField(dep_field, `${field_name}`)
                                    )}
                                </>
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
        if (type === "object" && oneOf === undefined) {
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
                />
            );
        }

        return (
            <div className={clsx({ "border p-3 rounded-md": type === "object", hidden: uiOpts?.hidden === true })} key={order}>
                <label htmlFor={field_name} className="flex flex-col space-y-1">
                    <span className="text-md font-medium jus">{title}</span>

                    {type === "string" &&
                        (field.enum ? (
                            <EnumField form={form} field_name={field_name} fieldEnum={field.enum} />
                        ) : (
                            <TextBox field={field} form={form} field_name={field_name} defaultValue={defaultValue} />
                        ))}

                    {type === "integer" && (
                        <Integer
                            field_name={field_name}
                            form={form}
                            minimum={minimum}
                            maximum={maximum}
                            defaultValue={defaultValue}
                        />
                    )}

                    {oneOf && (
                        <SingleSelect form={form} field_name={field_name} originalFieldName={originalFieldName} oneOf={oneOf} />
                    )}

                    {type === "array" && <TextArray type={type} form={form} field_name={field_name} description={description} />}

                    {description && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></div>
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
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col space-y-4">
                    <>{sortedProperties.map((field) => renderFormField(field))}</>
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting && <CircularLoader />}
                        {submitButtonText || "Submit"}
                    </Button>
                </form>
                {errorText && <ErrorAlert error={errorText} />}
            </Form>
        </>
    );
}
