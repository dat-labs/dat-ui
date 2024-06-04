import React from "react";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function SingleSelect({ form, field_name, originalFieldName, oneOf }) {
    return (
        <>
            <FormField
                control={form.control}
                name={`${field_name}.${originalFieldName}`}
                render={({ field }) => (
                    <>
                        <FormItem>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    {oneOf.map((option: any, index: number) => (
                                        <>
                                            <SelectItem key={index} value={option.properties[originalFieldName].default}>
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
    );
}
