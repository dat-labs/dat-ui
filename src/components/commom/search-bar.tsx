import { Input } from "@/components/ui/input";

export const SearchBar = () => {
    return (
        <Input
            id="search-bar"
            type="text"
            onChange={(e) => console.log(e.target.value)}
            placeholder="Search..."
            // defaultValue={defaultValue}
            className="px-8 py-6"
        />
    );
};
