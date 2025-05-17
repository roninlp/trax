"use client";

import { api } from "@/trpc/react";

const HabitsList = () => {
	const [habits] = api.habit.getAll.useSuspenseQuery();
	return (
		<div className="flex flex-col gap-4">
			<div>HabitsList</div>
			<ul className="flex flex-col gap-2">
				{habits.map((habit) => (
					<li key={habit.id}>{habit.name}</li>
				))}
			</ul>
		</div>
	);
};

export default HabitsList;
