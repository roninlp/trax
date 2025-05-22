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
import { useTRPC } from "@/trpc/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod/v4-mini";

const CreateHabit = () => {
	const api = useTRPC();
	const client = useQueryClient();
	const { mutate, isPending } = useMutation(api.habit.create.mutationOptions());
	const form = useForm<z.infer<typeof habitInsertSchema>>({
		defaultValues: {
			name: "",
			description: "",
			targetCount: 1,
			scheduleType: "daily",
			frequency: 1,
			startDate: new Date(),
		},
		resolver: standardSchemaResolver(habitInsertSchema),
	});
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((values) => {
					mutate(values);
					client.invalidateQueries({
						queryKey: api.habit.getAll.queryKey(),
					});
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
