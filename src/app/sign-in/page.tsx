"use client";

import { LogoBlack } from "@/assets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import FormGenerator from "@/components/ClientComponents/FormGenerator";
import { signIn } from "next-auth/react"; // Import NextAuth signIn
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function SignInPage() {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        setError(""); // Reset error message
        setIsSubmitting(true); // Start submitting state

        const credentials = {
            email: data.email,
            password: data.password,
        };

        const result = await signIn("credentials", {
            redirect: false, // Prevent NextAuth from redirecting automatically
            ...credentials,
        });

        if (result?.error) {
            setError("Failed to sign in. Please check your credentials.");
            toast.error("Failed to sign in. Please check your credentials.");
        } else {
            toast.success("Sign in successful!");
            router.push("/connections"); // Redirect on success
        }

        setIsSubmitting(false); // End submitting state
    };

    const props = {
        email: {
            title: "Enter your email address",
            type: "string",
            field_name: "email",
        },
        password: {
            title: "Enter your password",
            type: "string",
            field_name: "password",
            "ui-opts": {
                masked: true, // Mask password input
            },
        },
    };

    const required_fields = ["email", "password"];

    return (
        <div className="flex items-center justify-center min-h-screen"> {/* Center content */}
            <div className="w-full max-w-md"> {/* Limit the width */}
                <Card className="m-auto">
                    <CardHeader>
                        <LogoBlack className="h-8 w-20 fill-foreground mb-4" />
                        <CardTitle className="text-2xl">Sign In to Your Account</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {isSubmitting ? (
                            <div className="flex flex-col items-center">
                                <p>Signing you in...</p>
                            </div>
                        ) : (
                            <FormGenerator
                                properties={props}
                                required_fields={required_fields}
                                onSubmit={onSubmit}
                                errorText={error} // Show error if exists
                                submitButtonText="Sign In" // Button text
                            />
                        )}
                    </CardContent>
                </Card>
                <div className="text-center mt-4"> {/* Center the text */}
                    <p>
                        Don't have an account? 
                        <span 
                            className="text-red-500 cursor-pointer" 
                            onClick={() => router.push("/sign-up")} // Redirect to signup page
                        >
                            {" Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
