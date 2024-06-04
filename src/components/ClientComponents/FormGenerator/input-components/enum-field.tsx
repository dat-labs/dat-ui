import React from "react";
import { FormField, FormItem, FormMessage, Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function EnumField({ form, field_name, fieldEnum }) {
    return (
        <FormField
            control={form.control}
            name={field_name}
            render={({ field }) => (
                <>
                    <FormItem>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                                {fieldEnum.map((option: any, index: number) => (
                                    <>
                                        <SelectItem key={index} value={option}>
                                            {option}
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
    );
}
