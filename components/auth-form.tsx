"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { login, signup } from "@/actions/auth/login";

import { authFormSchema } from "@/schematypes";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, LogIn, Terminal } from "lucide-react";

interface AuthFormProps {
    className?: string;
    alternative: {
        href: string;
        linkText: string;
    };
}

const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
    const [authType, setAuthType] = useState<"login" | "signup">("signup");
    const [serverError, setServerError] = useState("");

    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        if (authType === "login") {
            const res = await login(values);
            if (!res.success) {
                setServerError(res.error);
            }
        } else await signup(values);
    };

    return (
        <Form {...form}>
            <h2 className="text-xl font-semibold text-center">
                {authType === "login" ? "Welcome Back!" : "Create an Account"}
            </h2>
            <p className="text-neutral-500 mb-6 text-center">
                {authType === "login"
                    ? "Let's log you in"
                    : "Let's get you started"}
            </p>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={`space-y-8 ${className}`}
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter username"
                                    {...field}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormDescription>
                                Must be at least 2 characters long.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    {...field}
                                    autoComplete="off"
                                />
                            </FormControl>
                            <FormDescription>
                                Must be at least 6 characters long.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-3 flex-wrap">
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full md:w-40 flex items-center justify-center gap-2"
                    >
                        {form.formState.isSubmitting ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <LogIn />
                        )}
                        {form.formState.isSubmitting
                            ? authType === "login"
                                ? "Logging in..."
                                : "Creating..."
                            : authType === "login"
                            ? "Log in"
                            : "Create account"}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            setServerError("");
                            setAuthType(
                                authType === "login" ? "signup" : "login"
                            );
                            form.resetField("username");
                            form.resetField("password");
                        }}
                        className="w-full md:w-fit"
                    >
                        {authType === "login"
                            ? "Create account instead"
                            : "Log in instead"}
                    </Button>
                </div>
            </form>
            {serverError && (
                <Alert className="mt-3 border-red-500 border-1 text-red-500">
                    <Terminal />
                    <AlertTitle> Log in failed </AlertTitle>
                    <AlertDescription>{serverError}</AlertDescription>
                </Alert>
            )}
        </Form>
    );
};

export default AuthForm;
