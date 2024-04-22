"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormDescription, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";

export default function FormGenerator({ properties, onSubmit }: { properties: any; onSubmit: any }) {
    // const {
    //     handleSubmit,
    //     register,
    //     control,
    //     onValueChange,
    //     formState: { errors },
    // } = useForm();
    const form = useForm();

    const onSubmitForm = async (data: any) => {
        console.log("Form Data:", data);
        onSubmit(data);
    };

    const renderFormField = (field: any) => {
        const { type, title, description, order, minimum, maximum, defaultValue, examples, oneOf, field_name } = field;
        return (
            <div key={order}>
                <label htmlFor={field_name} className="flex flex-col space-y-1">
                    <span>{field_name}</span>
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
                        <FormField
                            control={form.control}
                            name={field_name}
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {oneOf.map((option: any, index: number) => (
                                                <SelectItem key={index} value={option.properties?.[option.required[0]]?.const}>
                                                    {option.field_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {description && (
                        <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: description }}></div>
                    )}

                    {form.formState.errors[field_name] && (
                        <p className="text-sm text-destructive">{form.formState.errors[field_name].message}</p>
                    )}
                </label>
            </div>
        );
    };
    Object.keys(properties).forEach((key) => {
        properties[key].field_name = key;
    });
    const sortedProperties = Object.values(properties).sort((a, b) => a.order - b.order);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col space-y-4">
                {sortedProperties.map(renderFormField)}
                <Button type="submit">
                    <svg
                        aria-hidden="true"
                        className="w-4 h-4 mr-4 text-gray-200 animate-spin dark:text-gray-600 fill-slate-800"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    Submit
                </Button>
            </form>
        </Form>
    );
}
