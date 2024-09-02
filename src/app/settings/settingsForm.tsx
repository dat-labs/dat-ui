import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormGenerator from "@/components/ClientComponents/FormGenerator";

function SettingsForm({
    submitForm,
    defaultUserData,
    title,
    formError,
}: {
    submitForm: any;
    defaultUserData?: any;
    title: string;
    formError: string;
}) {
    const props: any = {
        email: {
            title: "Enter new email address",
            type: "string",
            field_name: "email",
        },
        password: {
            title: "Enter new password",
            type: "string",
            field_name: "password",
            "ui-opts": {
                masked: true,
            },
        },
        confirm_password: {
            title: "Confirm new password",
            type: "string",
            field_name: "confirm_password",
            "ui-opts": {
                masked: true,
            },
        },
    };

    const required_fields = ["email", "password", "confirm_password"];

    return (
        <Card className="w-10/12 h-fit mt-8 mx-auto">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <FormGenerator
                    properties={props}
                    required_fields={required_fields}
                    submitButtonText="Submit"
                    onSubmit={submitForm}
                    defaultData={defaultUserData}
                    errorText={formError}
                />
            </CardContent>
        </Card>
    );
}

export default SettingsForm;
