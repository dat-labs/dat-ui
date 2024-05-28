import React, { memo } from "react";
import { NoConnection } from "@/assets";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


const config = {
    connection: {
        heading: (
            <p className="flex items-center gap-2 overflow-hidden text-center text-ellipsis text-gray-500 text-base font-medium leading-6">
                Google Drive (Source) <ArrowRightIcon /> Open AI (Generator - Embedding) <ArrowRightIcon /> Pinecone (Destination - Vector DB)
            </p>
        ),
        description: (
            <>
                <p>It looks like you haven't setup any connection yet.</p>
                <p>To create a connection please setup at least One source, One generator, & One destination.</p>
            </>
        ),
        buttonText: "Setup New Connection",
        icon: NoConnection,
        redirectUrl: "/connections/create",
    },
};

const Empty = ({ configKey }: { configKey: string }) => {
    const router = useRouter();
    const { heading, description, buttonText, icon, redirectUrl } = config[configKey];

    const clickHandler = () => {
        router.push(redirectUrl);
    };
    return (
        <div className="flex justify-between items-center flex-col gap-8">
            <div>{heading}</div>
            <NoConnection className="h-80 w-full fill-foreground mb-4" />
            <div className="text-center space-y-2 font-bold">{description}</div>
            {/* <NoConnection className="h-80 w-full fill-foreground mb-4" />
            <div className="">{description}</div> */}
            <Button onClick={clickHandler} variant="default" className="px-4 py-2">
                {buttonText}
            </Button>
        </div>
    );
};

export default memo(Empty);
