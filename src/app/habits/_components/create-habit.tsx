"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { habitInsertSchema } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const CreateHabit = () => {
	const { mutate, isPending } = api.habit.create.useMutation({
		onSuccess: () => {},
	});
	const form = useForm<z.infer<typeof habitInsertSchema>>({
		defaultValues: {
			name: "",
			description: "",
			targetCount: 1,
			scheduleType: "daily",
			frequency: 1,
			startDate: new Date(),
		},
		resolver: zodResolver(habitInsertSchema),
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => {
					mutate(values);
				})}
			>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="Name" />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">create</Button>
			</form>
		</Form>
	);
};

export default CreateHabit;
