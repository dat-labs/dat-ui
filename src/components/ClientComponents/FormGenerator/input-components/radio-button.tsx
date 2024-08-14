import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioButton({ form, oneOf, originalFieldName, field_name, required = false }) {
    const validationRules = {};
    if (required) {
        validationRules.required = "Select an option!";
    }
    return (
        <FormField
            control={form.control}
            name={`${field_name}.${originalFieldName}`}
            render={({ field }) => (
                <FormItem className="space-y-3">
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            {...form.register(field_name, validationRules)}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                        >
                            {oneOf.map((option: any, index: number) => (
                                <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={option.properties[originalFieldName].default} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.title}</FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
