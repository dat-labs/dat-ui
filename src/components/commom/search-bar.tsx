import { Input } from "@/components/ui/input";
import React from "react";

export const SearchBar = ({ handleChange, search }) => {
    return (
        <Input
            id="search-bar"
            type="text"
            onChange={handleChange}
            placeholder="Search..."
            // defaultValue={defaultValue}
            className="px-8 py-6"
            value={search}
        />
    );
};
