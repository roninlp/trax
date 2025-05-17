"use client";

import { useTRPC } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { HabitItem } from "./habit";

const HabitsList = () => {
	const api = useTRPC();
	const { data: habits } = useSuspenseQuery(api.habit.getAll.queryOptions());
	return (
		<div className="flex flex-col gap-4">
			<div>HabitsList</div>
			<ul className="flex flex-col gap-2">
				{habits.map((habit) => (
					<HabitItem key={habit.id} habit={habit} />
				))}
			</ul>
		</div>
	);
};

export default HabitsList;
