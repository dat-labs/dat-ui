import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TextBox({ field, form, field_name, defaultValue, uiOpts }) {
    const fieldEnum = field.enum;
    if (uiOpts?.multiline === true) {
        return (
            <Textarea
                id={field_name}
                type={uiOpts?.masked ? "password" : "text"}
                {...form.register(field_name, { required: "This is a required field." })}
                defaultValue={defaultValue}
            />
        );
    }
    return (
        <>
            <Input
                id={field_name}
                type={uiOpts?.masked ? "password" : "text"}
                {...form.register(field_name, { required: "This is a required field." })}
                defaultValue={defaultValue}
            />
        </>
    );
}
