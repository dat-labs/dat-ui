import { cn } from "@/lib/utils";

/**
 * Skeleton component renders a placeholder element with skeleton loading effect.

 * @param {string} className - Additional class names to be applied to the skeleton element.
 * @returns {JSX.Element} Skeleton component with skeleton loading effect.
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}

export { Skeleton };
