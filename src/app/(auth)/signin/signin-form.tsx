"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/libs/auth-client";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { z } from "zod/v4-mini";

const signInSchema = z.object({
	email: z.email(),
	password: z.string().check(z.minLength(8)),
});

export function SignInForm() {
	const form = useForm<z.infer<typeof signInSchema>>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: standardSchemaResolver(signInSchema),
	});

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit((values) => {
					console.log("🚀 ~ onSubmit={form.handleSubmit ~ values:", values);
					authClient.signIn.email({
						email: values.email,
						password: values.password,
						fetchOptions: {
							onError: (error) => {
								console.log("🚀 ~ onError:", error.error);
							},
						},
					});
				})}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Email" />
							</FormControl>
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
								<Input {...field} placeholder="Password" type="password" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="w-full" type="submit">
					sign in
				</Button>
			</form>
		</Form>
	);
}
