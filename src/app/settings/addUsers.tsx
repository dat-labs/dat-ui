"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import bcrypt from "bcryptjs";

function AddUsers() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

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

    return (
        <Card className="w-10/12 h-fit mt-8 py-4 px-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-3">
                    <p className="text-xl font-semibold">Add a new user to this Workspace</p>
                    <div>
                        <Label htmlFor="email">Enter new user's E-mail</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="password">Enter new user's default password</Label>
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
                        <Label htmlFor="confirm-password">Confirm Password</Label>
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

export default AddUsers;
