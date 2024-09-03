"use client";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
import SettingsForm from "./settingsForm";

function AddUsers() {
    const [error, setError] = useState("");

    const onSubmit = async (data: any) => {
        if (data.password != data.confirm_password) {
            setError("Passwords don't match!");
            return;
        }

        error && setError(null);

        const formData = {
            email: data.email,
            password: data.password,
        };

        console.log("New User Form Data:", formData);
    };

    return <SettingsForm submitForm={onSubmit} title="Update your account" formError={error} />;
}

export default AddUsers;
