import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const ErrorAlert = ({ error }) => {
    return (
        <div className="mt-5 mr-8 ">
            <Alert variant={"destructive"} className="flex gap-4 bg-white text-red-500">
                <span className="flex items-center">
                    <ExclamationTriangleIcon className="size-8" />
                </span>
                <div className="flex flex-col">
                    <AlertTitle className="text-base">Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </div>
            </Alert>
        </div>
    );
};
