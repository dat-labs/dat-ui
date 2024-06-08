import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";

// Replaced the old searchbar with new searchbar ->

// export const SearchBar = ({ handleChange, search }) => {
//     return (
//         <Input
//             id="search-bar"
//             type="text"
//             onChange={handleChange}
//             placeholder="Search..."
//             // defaultValue={defaultValue}
//             className="px-8 py-6"
//             value={search}
//         />
//     );
// };

export const Search = React.forwardRef(({ className, handleSearch, search, ...props }, ref) => {
    return (
        <div className="relative h-10 w-full">
            <MagnifyingGlassIcon className="absolute h-6 w-6 left-3 top-[18px] transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
                onChange={handleSearch}
                value={search}
                {...props}
                ref={ref}
                className={cn(
                    "pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:border-transparent",
                    className
                )} // Add additional styling as needed
            />
        </div>
    );
});
