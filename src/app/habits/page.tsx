import { api } from "@/trpc/server";
import CreateHabit from "./_components/create-habit";
import HabitsList from "./_components/habits-list";

export default async function HabitsPage() {
	void api.habit.getAll.prefetch();

	return (
		<div className="flex justify-between gap-4">
			<CreateHabit />
			<HabitsList />
		</div>
	);
}
