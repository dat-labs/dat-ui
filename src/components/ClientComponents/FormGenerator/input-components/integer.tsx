import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";

export default function Integer({ field_name, form, minimum, maximum, defaultValue,handleUnregister, required = false }) {
    const validationRules = {
        min: { value: minimum, message: `Minimum value is ${minimum}` },
        max: { value: maximum, message: `Maximum value is ${maximum}` },
        valueAsNumber: true,
    };
    if (required) {
        validationRules.required = "Select an option!";
    }
    useEffect(() => {
        return () => {
            handleUnregister(field_name);
        };
    }, [handleUnregister, field_name]);
    return (
        <>
            <Input id={field_name} type="number" {...form.register(field_name, validationRules)} defaultValue={defaultValue} />
        </>
    );
}
