"use client";

import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import Loading from "../sources/loading";
import SettingsForm from "./settingsForm";

function AccountSettings() {
    const [currentEmail, setCurrentEmail] = useState("");
    const [error, setError] = useState("");

    const onSubmit = async (data: any) => {
        if (data.password != data.confirm_password) {
            setError("Passwords don't match!");
            return;
        }

        error && setError(null);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const formData = {
            email: data.email,
            password: hashedPassword,
        };

        console.log("Form Data with Hashed Password:", formData);
    };

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setCurrentEmail(sessionData.user.email);
        };
        fetchSession();
    }, []);

    if (!currentEmail) {
        return <Loading />;
    }

    return (
        <SettingsForm
            submitForm={onSubmit}
            defaultUserData={{ email: currentEmail }}
            title="Update your account"
            formError={error}
        />
    );
}

export default AccountSettings;
