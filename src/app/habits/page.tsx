import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import CreateHabit from "./_components/create-habit";
import HabitsList from "./_components/habits-list";

export default async function HabitsPage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.habit.getAll.queryOptions());

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex justify-between gap-4">
				<CreateHabit />
				<HabitsList />
			</div>
		</HydrationBoundary>
	);
}
