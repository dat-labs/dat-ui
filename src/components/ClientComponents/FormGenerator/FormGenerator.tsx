"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import CircularLoader from "@/components/ui/circularLoader";
import clsx from "clsx";

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
}: {
    properties: any;
    onSubmit: any;
    defaultData?: any;
}) {
    const form = useForm({ defaultValues: defaultData });

    /**
     * Function to handle form submission
     * @param data
     * @returns form submission
     */
    const onSubmitForm = async (data: any) => {
        await onSubmit(data);
    };

    /**
     * Function to render differnt form fields based on the type of the field
     * @param field
     * @returns form fields
     */
    const renderFormField = (field: any) => {
        if (!field) {
            return null;
        }
        const { type, title, description, order, minimum, maximum, defaultValue, examples, oneOf, field_name } = field;
        const watchFieldValue = form.watch(field_name);

        /**
         * Check if the field value has more properties to render and call renderFormField recursively
         * @param watchFieldValue
         * @param oneOf
         * @returns recursive function to render more properties
         */
        const checkIfFieldValueHasMoreProperties = (watchFieldValue: string, oneOf: any) => {
            if (watchFieldValue) {
                const selectedOption = oneOf.find((option: any) => option.title === watchFieldValue);
                console.log(selectedOption);
                if (selectedOption && Object.keys(selectedOption.properties).length > 1) {
                    Object.keys(selectedOption.properties).forEach((key) => {
                        selectedOption.properties[key].field_name = key;
                    });
                    let depFields = Object.values(selectedOption.properties).filter((field: any) => field?.const === undefined);
                    const sortedDepFields = Object.values(depFields).sort((a: any, b: any) => a.order - b.order);
                    if (sortedDepFields && sortedDepFields.length > 0) {
                        return (
                            <div className="flex flex-col space-y-4">
                                <>{sortedDepFields?.map((dep_field) => dep_field && renderFormField(dep_field))}</>
                            </div>
                        );
                    }
                }
            }
            return null;
        };

        return (
            <div className={clsx({ "border-2 border-slate-700 p-3 rounded-md": type === "object" })} key={order}>
                <label htmlFor={field_name} className="flex flex-col space-y-1">
                    <span>{title}</span>
                    {type === "string" && (
                        <Input
                            id={field_name}
                            type="text"
                            {...form.register(field_name, { required: "This is a required field." })}
                            defaultValue={defaultValue}
                        />
                    )}

                    {type === "integer" && (
                        <Input
                            id={field_name}
                            type="number"
                            {...form.register(field_name, {
                                required: "This is a required field.",
                                min: { value: minimum, message: `Minimum value is ${minimum}` },
                                max: { value: maximum, message: `Maximum value is ${maximum}` },
                            })}
                            defaultValue={defaultValue}
                        />
                    )}
                    {type === "object" && oneOf && (
                        <>
                            <FormField
                                control={form.control}
                                name={field_name}
                                render={({ field }) => (
                                    <>
                                        <FormItem>
                                            <Select onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {oneOf.map((option: any, index: number) => (
                                                        <>
                                                            <SelectItem key={index} value={option.title}>
                                                                {option.title}
                                                            </SelectItem>
                                                        </>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    </>
                                )}
                            />
                        </>
                    )}
                    {description && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></div>
                    )}

                    {form.formState.errors[field_name] && (
                        <p className="text-sm text-destructive">
                            <>{form.formState.errors[field_name].message}</>
                        </p>
                    )}

                    <div className="pl-4">{type === "object" && checkIfFieldValueHasMoreProperties(watchFieldValue, oneOf)}</div>
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
                <>{sortedProperties.map((field) => renderFormField(field))}</>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <CircularLoader />}
                    Submit
                </Button>
            </form>
        </Form>
    );
}
