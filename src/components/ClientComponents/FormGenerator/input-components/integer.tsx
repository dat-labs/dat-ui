import { Input } from "@/components/ui/input";
import React from "react";

export default function Integer({ field_name, form, minimum, maximum, defaultValue }) {
    return (
        <>
            <Input
                id={field_name}
                type="number"
                {...form.register(field_name, {
                    required: "This is a required field.",
                    min: { value: minimum, message: `Minimum value is ${minimum}` },
                    max: { value: maximum, message: `Maximum value is ${maximum}` },
                    valueAsNumber: true,
                })}
                defaultValue={defaultValue}
            />
        </>
    );
}
