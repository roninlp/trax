import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import CreateHabit from "./_components/create-habit";
import HabitsList from "./_components/habits-list";

export default async function HabitsPage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(trpc.habit.getAll.queryOptions());

	return (
		<HydrationBoundary>
			<div className="flex justify-between gap-4">
				<CreateHabit />
				<Suspense fallback={<div>Loading...</div>}>
					<HabitsList />
				</Suspense>
			</div>
		</HydrationBoundary>
	);
}
