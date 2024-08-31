"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import Loading from "../sources/loading";

function AccountSettings() {
    const [session, setSession] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();
    }, [reset]);

    const onSubmit = async (data) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        const formData = {
            email: data.email,
            password: hashedPassword,
        };

        console.log("Form Data with Hashed Password:", formData);
    };

    const password = watch("password");

    if (!session) {
        return <Loading />;
    }

    return (
        <Card className="flex flex-col space-y-3 mt-8 w-10/12 h-fit mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-3">
                    <p className="text-xl font-semibold">Update User Profile</p>

                    <div>
                        <Label htmlFor="email">
                            <span className="flex gap-1 mb-1">
                                Enter updated E-mail
                                <QuestionMarkCircledIcon height={15} width={15} className="text-muted-foreground my-auto" />
                            </span>
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            defaultValue={session.user.email}
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password">Enter your new password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long",
                                },
                            })}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="confirm-password">Confirm new password</Label>
                        <Input
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) => value === password || "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </Card>
    );
}

export default AccountSettings;
