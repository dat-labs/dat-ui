import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TextBox({ field, form, field_name, defaultValue, uiOpts, required = false }) {
    const fieldEnum = field.enum;
    const validationRules = {};

    // If the field is required, add the required validation rule
    if (required) {
        validationRules.required = "This is a required field.";
    }

    if (field_name === "namespace") {
        validationRules.pattern = {
            value: /^[a-zA-Z0-9 _-]+$/,
            message: "Only alphabets, numbers, underscores, hyphens, and spaces are allowed.",
        };
    }

    if (uiOpts?.multiline === true) {
        return (
            <Textarea
                id={field_name}
                type={uiOpts?.masked ? "password" : "text"}
                {...form.register(field_name, validationRules)}
                defaultValue={defaultValue}
            />
        );
    }

    return (
        <>
            <Input
                id={field_name}
                type={uiOpts?.masked ? "password" : "text"}
                {...form.register(field_name, validationRules)}
                defaultValue={defaultValue}
            />
        </>
    );
}
