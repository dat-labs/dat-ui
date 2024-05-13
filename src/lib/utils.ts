import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(str) {
    if (!str) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getIconComponent = (iconName: string) => {
    // Use dynamic imports and handle exceptions
    if (!iconName) {
        // Check for null or empty string
        return Promise.resolve(null); // Return default icon
    }
    try {
        return import(`@/assets/actors/${iconName}`).then((module) => module.default);
    } catch (error) {
        console.warn(`Failed to import icon: ${iconName}`, error);
        return Promise.resolve(null); // Return default icon on error
    }
};
