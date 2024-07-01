import React from "react";

/**
 * Custom Chip component
 */
const Chip = ({ value, onDelete }) => {
    return (
        <div className="flex items-center rounded-md bg-muted px-2 py-1 text-sm">
            {value}
            <button type="button" className="ml-2 rounded-md p-1 text-red-500 hover:bg-red-100" onClick={onDelete}>
                &times;
            </button>
        </div>
    );
};

export default Chip;
