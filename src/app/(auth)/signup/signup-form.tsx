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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const signUpSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
});

export function SignUpForm() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		defaultValues: {
			email: "",
			password: "",
			name: "",
		},
		resolver: zodResolver(signUpSchema),
	});

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit((values) => {
					console.log("🚀 ~ onSubmit={form.handleSubmit ~ values:", values);
					authClient.signUp.email({
						email: values.email,
						password: values.password,
						name: values.name,
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Name" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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
					signUp
				</Button>
			</form>
		</Form>
	);
}
