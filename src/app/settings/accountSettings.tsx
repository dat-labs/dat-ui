"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function AccountSettings() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await getSession();
            setSession(session);
        };
        fetchSession();
    }, []);

    return (
        <Card className="flex flex-col space-y-3 mt-8 w-10/12 h-fit py-6 px-6">
            <p className="text-xl font-semibold">User Profile</p>
            <div className="flex flex-row items-center space-x-1">
                <p className="font-semibold">Your Email Addres</p>{" "}
                <QuestionMarkCircledIcon height={18} width={18} className="text-muted-foreground" />
            </div>
            <Input placeholder={session?.user?.email} type="email" />
            <div className="flex space-x-4 justify-end">
                <Button variant={"secondary"}>Cancel</Button>
                <Button>Save</Button>
            </div>
        </Card>
    );
}

export default AccountSettings;
