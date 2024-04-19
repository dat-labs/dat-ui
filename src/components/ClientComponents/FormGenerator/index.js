"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormDescription, FormItem, FormLabel, FormMessage, Form } from "@/components/ui/form";

export default function FormGenerator({ properties }) {
    // const {
    //     handleSubmit,
    //     register,
    //     control,
    //     onValueChange,
    //     formState: { errors },
    // } = useForm();
    const form = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Handle form submission here
    };

    const renderFormField = (field) => {
        const { type, title, description, order, minimum, maximum, defaultValue, examples, oneOf } = field;

        return (
            <div key={order}>
                <label htmlFor={title} className="flex flex-col space-y-1">
                    <span>{title}</span>
                    {type === "string" && (
                        <Input id={title} type="text" {...form.register(title, { required: true })} defaultValue={defaultValue} />
                    )}

                    {type === "integer" && (
                        <Input
                            id={title}
                            type="number"
                            {...form.register(title, {
                                required: true,
                                min: minimum,
                                max: maximum,
                            })}
                            defaultValue={defaultValue}
                        />
                    )}
                    {type === "object" && oneOf && (
                        <FormField
                            control={form.control}
                            name={title}
                            render={({ field }) => (
                                <FormItem>
                                    <Select onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {oneOf.map((option, index) => (
                                                <SelectItem key={index} value={option.properties.mode.const}>
                                                    {option.title}
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

                    {form.formState.errors[title] && <p className="text-sm text-destructive">This field is required</p>}
                    {/* {examples && examples.length > 0 && (
                        <p className="text-sm text-muted-foreground">Example: {examples.join(", ")}</p>
                    )} */}
                </label>
            </div>
        );
    };

    const sortedProperties = Object.values(properties).sort((a, b) => a.order - b.order);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                {sortedProperties.map(renderFormField)}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
