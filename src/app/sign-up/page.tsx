"use client";

import { LogoBlack } from "@/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import JoinDat from "./joinDat";
import FormGenerator from "@/components/ClientComponents/FormGenerator";
import useApiCall from "@/hooks/useApiCall";
import { addWorkspaceUser, createNewOrganization, createNewUser } from "./api";
import { createWorkspace } from "@/components/ClientComponents/addWorkspace/api";
import { toast } from "sonner";
import Image from "next/image";
import DatGif from "@/assets/datLoader.gif";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
    const [error, setError] = useState("");
    const [currentStatus, setCurrentStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: userData, makeApiCall: addUserApiCall } = useApiCall(createNewUser);
    const { makeApiCall: addOrgApiCall } = useApiCall(createNewOrganization);
    const { makeApiCall: addWkspcApiCall } = useApiCall(createWorkspace);
    const { makeApiCall: addWkspcUserApiCall } = useApiCall(addWorkspaceUser);

    const settingUp = ["Setting up your workspace", "Setting up your account", "Setting up dat for you", "Finshed!"];

    const onSubmit = async (data) => {
        error && setError(null);

        const UserData = {
            email: data.email,
            password: data.password,
        };

        const createUserRes = await addUserApiCall(UserData);
        if (createUserRes?.status === 200) {
            const OrgData = {
                name: data.name,
                status: "active",
            };
            const createOrgRes = await addOrgApiCall(OrgData);
            if (createOrgRes.status === 200) {
                const WkspcData = {
                    name: "Default",
                    organization_id: createOrgRes.responseData.id,
                    status: "active",
                };

                const createWkspcRes = await addWkspcApiCall(WkspcData);
                if (createWkspcRes.status === 200) {
                    const WkspcUserData = {
                        workspace_id: createWkspcRes.responseData.id,
                        user_id: createUserRes.responseData.id,
                    };

                    const workspaceUserRes = await addWkspcUserApiCall(WkspcUserData);

                    if (workspaceUserRes.status === 200) {
                        setIsSubmitting(true);
                        setCurrentStatus(0);
                    } else {
                        toast.error("Failed during Workspace User creation");
                    }
                } else {
                    toast.error("Failed during workspace creation");
                }
            } else {
                toast.error("Failed during Organization creation");
            }
        } else {
            toast.error("Failed during User creation");
        }
    };
    const router = useRouter();

    useEffect(() => {
        if (currentStatus !== null && currentStatus < settingUp.length) {
            const timer = setTimeout(() => {
                setCurrentStatus(currentStatus + 1);
            }, 2000);

            return () => clearTimeout(timer);
        } else if (currentStatus === settingUp.length) {
            const timer = setTimeout(() => {
                setIsSubmitting(false);
                router.push("/connections");
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [currentStatus]);

    const props = {
        email: {
            title: "Enter your email address",
            type: "string",
            field_name: "email",
        },
        name: {
            title: "Organization Name",
            type: "string",
            field_name: "name",
        },
        password: {
            title: "Enter your password",
            type: "string",
            field_name: "password",
            "ui-opts": {
                masked: true,
            },
        },
    };

    const required_fields = ["email", "password", "name"];

    return (
        <div className="flex flex-row">
            <JoinDat />
            <div className="w-0.5 h-[90vh] rounded-lg m-10 bg-gradient-to-b from-[#EEEEEE] via-[#888888] to-[#EEEEEE]"></div>
            <div className="w-1/2 flex flex-col">
                <Card className="w-9/12 m-auto">
                    <CardHeader>
                        <LogoBlack className="h-8 w-20 fill-foreground mb-4" />
                        <CardTitle className="text-2xl">Sign Up for a New account</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {isSubmitting ? (
                            <div className="flex flex-col items-center">
                                <Image src={DatGif} alt="dat-gif" width={300} />
                                <p>{settingUp[currentStatus]}</p>
                            </div>
                        ) : (
                            <FormGenerator
                                properties={props}
                                required_fields={required_fields}
                                onSubmit={onSubmit}
                                errorText={error}
                                submitButtonText="Submit"
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
