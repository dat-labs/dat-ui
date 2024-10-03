import React from "react";
import FormGenerator from "@/components/ClientComponents/FormGenerator";

function AddUserForm({
    submitForm,
    defaultUserData,
    title,
    formError,
}: {
    submitForm: any;
    defaultUserData?: any; // Optional default user data for the form
    title: string; // Title of the form
    formError: string; // Error message for the form
}) {
    // Define the properties of the form fields
    const props: any = {
        email: {
            title: "Enter new user email address",
            type: "string",
            field_name: "email",
        },
        password: {
            title: "Enter new user password",
            type: "string",
            field_name: "password",
            "ui-opts": {
                masked: true, // Mask the password input
            },
        },
        confirm_password: {
            title: "Confirm new user password",
            type: "string",
            field_name: "confirm_password",
            "ui-opts": {
                masked: true, // Mask the confirm password input
            },
        },
    };

    // List of required fields for the form submission
    const required_fields = ["email", "password", "confirm_password"];

    return (
        <FormGenerator
            properties={props} // Form field properties
            required_fields={required_fields} // Required fields for validation
            submitButtonText="Add User" // Text for the submit button
            onSubmit={submitForm} // Callback function for form submission
            defaultData={defaultUserData} // Default data for pre-filling the form
            errorText={formError} // Error text to display
        />
    );
}

export default AddUserForm;
