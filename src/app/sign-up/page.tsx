"use client";

import { GithubFollow, LogoBlack } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
    const [eyeClose, setEyeClose] = useState(true);
    const handleEyeClick = () => {
        setEyeClose(!eyeClose);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="flex flex-row">
            <div className="w-1/2 flex flex-col">
                <div className="ml-24 mt-12">
                    <div className="leading-[4rem] text-5xl font-semibold bg-gradient-to-b from-[#FFD9D2] to-[#99827E] bg-clip-text text-transparent">
                        Join, <br />
                        growing <br />
                        <span className="font-[Comfortaa] text-black">dat</span> <br />
                        Community
                    </div>
                    <div className="mt-4">
                        <Link href={"/"}>
                            <Button variant={"outline"} className="gap-2">
                                <GithubFollow className="size-6" /> Follow us on Github
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-[0.5px] h-[82vh] rounded-lg m-10 bg-gradient-to-b from-[#EEEEEE] via-[#888888] to-[#EEEEEE]"></div>

            <div className="w-1/2 flex flex-col">
                <Card className="w-9/12 m-auto">
                    <CardHeader>
                        <LogoBlack className="h-8 w-20 fill-foreground mb-4" />
                        <CardTitle className="text-xl">Log in to your account</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Label className="text-muted-foreground" htmlFor="email">
                                    Email <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    {...register("email", { required: "Email is required" })}
                                    type="email"
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <p className="ml-1 text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div>
                                <Label className="text-muted-foreground mb-6" htmlFor="organisation_name">
                                    Organisation <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="organisation_name"
                                    {...register("organisation_name", { required: "Organisation name is required" })}
                                    type="text"
                                    placeholder="Enter your organisation name"
                                />
                                {errors.organisation_name && (
                                    <p className="ml-1 text-sm text-red-500">{errors.organisation_name.message}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="password" className="text-muted-foreground flex justify-between mb-2">
                                    <p>
                                        Password <span className="text-destructive">*</span>
                                    </p>
                                    <p className="text-black">Forgot your password?</p>
                                </Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                                        })}
                                        type={eyeClose ? "password" : "text"}
                                        placeholder="Enter 8 characters password"
                                    />
                                    <span onClick={handleEyeClick}>
                                        {eyeClose ? (
                                            <EyeOpenIcon className="size-6 text-muted-foreground" />
                                        ) : (
                                            <EyeNoneIcon className="size-6 text-muted-foreground" />
                                        )}
                                    </span>
                                </div>
                                {errors.password && <p className="ml-1 text-sm text-red-500">{errors.password.message}</p>}
                            </div>

                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
