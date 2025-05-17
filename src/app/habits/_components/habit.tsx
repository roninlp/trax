import type { Habit } from "@/server/db/schema";
import { useTRPC } from "@/trpc/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function HabitItem({ habit }: { habit: Habit }) {
	const api = useTRPC();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation(
		api.habit.delete.mutationOptions({
			onSuccess: (data, vars, ctx) => {
				queryClient.invalidateQueries({
					queryKey: api.habit.getAll.queryKey(),
				});
			},
		}),
	);
	return (
		<li
			className={`flex gap-4 ${isPending ? "opacity-75" : ""}`}
			key={habit.id}
		>
			{habit.name}{" "}
			<button
				type="button"
				onClick={() => mutate(habit.id)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						mutate(habit.id);
					}
				}}
				className="hover:cursor-pointer"
			>
				❌
			</button>
		</li>
	);
}
