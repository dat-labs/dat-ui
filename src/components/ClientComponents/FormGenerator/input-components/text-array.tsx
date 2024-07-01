import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Chip from "@/components/commom/chip";

export default function TextArray({ field_name, description, defaultValue }) {
    const { getValues, setValue, watch } = useFormContext();

    const values = watch(field_name) || [];

    // Initialize default values only if the field is not already set
    if (values.length === 0 && defaultValue && defaultValue.length > 0) {
        setValue(field_name, defaultValue);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent Enter from submitting the form
            const inputValue = e.currentTarget.value.trim();
            if (inputValue && !values.includes(inputValue)) {
                const updatedValues = [...values, inputValue];
                setValue(field_name, updatedValues);
                e.currentTarget.value = ""; // Clear the input field after appending the value
            }
        }
    };

    const handleDelete = (index) => {
        const updatedValues = values.filter((_, i) => i !== index);
        setValue(field_name, updatedValues);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {values.map((value, index) => (
                    <Chip key={index} value={value} onDelete={() => handleDelete(index)} />
                ))}
            </div>
            <Input type="text" placeholder={description || "Enter a value and press Enter"} onKeyDown={handleKeyDown} />
        </div>
    );
}
