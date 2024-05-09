"use client";

import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import CircularLoader from "@/components/ui/circularLoader";
import clsx from "clsx";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

/**
 * Custom Chip component
 */
const Chip = ({ value, onDelete, children }: { value: any; onDelete: any; children: any }) => {
    return (
        <div className="flex items-center rounded-md bg-muted px-2 py-1 text-sm">
            {value || children}
            <button type="button" className="ml-2 rounded-md p-1 text-red-500 hover:bg-red-100" onClick={onDelete}>
                &times;
            </button>
        </div>
    );
};

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
        console.log(data);
        // await onSubmit(data);
    };

    /**
     * Function to render differnt form fields based on the type of the field
     * @param field
     * @returns form fields
     */
    const renderFormField = (field: any, parentKey?: string) => {
        if (!field) {
            return null;
        }
        let { type, title, description, order, minimum, maximum, defaultValue, examples, oneOf, field_name } = field;
        const originalFieldName = field_name;
        field_name = parentKey ? `${parentKey}.${field_name}` : field_name;
        const watchFieldValue = form.watch(`${field_name}.${originalFieldName}`);
        const { fields, append, remove } =
            type === "array"
                ? useFieldArray({
                      control: form.control,
                      name: field_name,
                      //   rules: { minLength: 1 },
                  })
                : { fields: null, append: null, remove: null };

        /**
         * Check if the field value has more properties to render and call renderFormField recursively
         * @param watchFieldValue
         * @param oneOf
         * @returns recursive function to render more properties
         */
        const checkIfFieldValueHasMoreProperties = (watchFieldValue: string, oneOf: any) => {
            if (watchFieldValue) {
                const selectedOption = oneOf.find((option: any) => option.title === watchFieldValue);
                if (selectedOption && Object.keys(selectedOption.properties).length > 1) {
                    Object.keys(selectedOption.properties).forEach((key) => {
                        selectedOption.properties[key].field_name = key;
                    });
                    let depFields = Object.values(selectedOption.properties).filter((field: any) => field?.const === undefined);
                    const sortedDepFields = Object.values(depFields).sort((a: any, b: any) => a.order - b.order);
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
                <div className={clsx({ "border border-muted p-3 rounded-md": type === "object" })} key={order}>
                    <Accordion type="single" collapsible className="data-entry-divider border-background">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>{title}</AccordionTrigger>
                            <AccordionContent>
                                <label htmlFor={field_name} className="flex flex-col space-y-1">
                                    {/* ... (existing code for rendering different field types) ... */}
                                    <div className="pl-4">
                                        <div className="flex flex-col space-y-4">
                                            <>{sortedProperties.map((prop) => renderFormField(prop, `${field_name}`))}</>
                                        </div>
                                    </div>
                                </label>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            );
        }

        return (
            <div className={clsx({ "border border-muted p-3 rounded-md": type === "object" })} key={order}>
                <label htmlFor={field_name} className="flex flex-col space-y-1">
                    <span className="text-md font-medium">{title}</span>
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
                                name={`${field_name}.${originalFieldName}`}
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
                    {type === "array" && (
                        <div>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {fields?.map((item, index) => (
                                    <Chip key={item.id} value={item?.value} onDelete={() => remove(index)}>
                                        {item?.value}
                                    </Chip>
                                ))}
                            </div>
                            <Input
                                type="text"
                                name={field_name}
                                placeholder={description || "Enter a value and press Enter"}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault(); // to prevent enter from submitting the form
                                        const inputValue = e.currentTarget.value.trim();
                                        if (inputValue) {
                                            append({ value: inputValue });
                                            e.currentTarget.value = ""; // Clear the input field after appending the value
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                    {description && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></div>
                    )}

                    {form.formState.errors[field_name] && (
                        <p className="text-sm text-destructive">
                            <>{form.formState.errors[field_name]?.message}</>
                        </p>
                    )}

                    <div className="pl-4">
                        {type === "object" && oneOf && checkIfFieldValueHasMoreProperties(watchFieldValue, oneOf)}
                    </div>
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
