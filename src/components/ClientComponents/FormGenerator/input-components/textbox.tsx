import React from "react";
import { Input } from "@/components/ui/input";

export default function TextBox({ field, form, field_name, defaultValue }) {
    const fieldEnum = field.enum;
    return (
        <>
            <Input
                id={field_name}
                type="text"
                {...form.register(field_name, { required: "This is a required field." })}
                defaultValue={defaultValue}
            />
        </>
    );
}
