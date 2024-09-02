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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const formData = {
            email: data.email,
            password: hashedPassword,
        };

        console.log("Form Data with Hashed Password:", formData);
    };

    return <SettingsForm submitForm={onSubmit} title="Update your account" formError={error} />;
}

export default AddUsers;
