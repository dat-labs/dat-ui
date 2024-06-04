import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
/**
 * Custom Chip component
 */
const Chip = ({ value, onDelete, children }: { value: any; onDelete: any; children: any }) => {
    return (
        <div className="flex items-center rounded-md bg-muted px-2 py-1 text-sm">
            {value || children}
            <button type="button" className="ml-2 rounded-md p-1 text-red-500 hover:bg-red-100" onClick={onDelete}>
                &times;
            </button>
        </div>
    );
};

export default function TextArray({ type, form, field_name, description }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: field_name,
        //   rules: { minLength: 1 },
    });

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {fields?.map((item, index) => (
                    <Chip key={item.id} value={item?.value} onDelete={() => remove(index)}>
                        {item?.value}
                    </Chip>
                ))}
            </div>
            <Input
                type="text"
                name={field_name}
                placeholder={description || "Enter a value and press Enter"}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // to prevent enter from submitting the form
                        const inputValue = e.currentTarget.value.trim();
                        if (inputValue) {
                            append({ value: inputValue });
                            e.currentTarget.value = ""; // Clear the input field after appending the value
                        }
                    }
                }}
            />
        </div>
    );
}
