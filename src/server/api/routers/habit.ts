import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
	habit,
	habitCompletion,
	habitCompletionInsertSchema,
	habitInsertSchema,
} from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const habitRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		return await ctx.db.query.habit.findMany({
			where: (habit, { eq }) => eq(habit.userId, ctx.session.user.id),
		});
	}),
	create: protectedProcedure
		.input(habitInsertSchema)
		.mutation(async ({ input, ctx }) => {
			return await ctx.db
				.insert(habit)
				.values({
					userId: ctx.session.user.id,
					...input,
				})
				.returning();
		}),
	delete: protectedProcedure
		.input(z.number().int())
		.mutation(async ({ input, ctx }) => {
			return await ctx.db.delete(habit).where(eq(habit.id, input));
		}),
	complete: protectedProcedure
		.input(habitCompletionInsertSchema)
		.mutation(async ({ input, ctx }) => {
			return await ctx.db.insert(habitCompletion).values(input).returning();
		}),
});
