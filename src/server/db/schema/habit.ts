import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { timestamps } from "../utils";
import { user } from "./auth";

export const habit = sqliteTable("habit", {
	id: integer().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	targetCount: integer().notNull().default(1),
	scheduleType: text({ enum: ["daily", "weekly", "monthly", "custom"] })
		.notNull()
		.default("daily"),
	frequency: integer().notNull().default(1),
	startDate: integer({ mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	...timestamps,
});

export const habitInsertSchema = createInsertSchema(habit).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	userId: true,
});

export const habitRelations = relations(habit, ({ one }) => ({
	user: one(user, {
		fields: [habit.userId],
		references: [user.id],
	}),
}));

export const habitCompletion = sqliteTable("habit_completion", {
	id: integer().primaryKey().notNull(),
	habitId: integer()
		.notNull()
		.references(() => habit.id, { onDelete: "cascade" }),
	date: integer({ mode: "timestamp" }).notNull(),
	completed: integer({ mode: "boolean" }).notNull(),
	...timestamps,
});

export const habitCompletionRelations = relations(
	habitCompletion,
	({ one }) => ({
		habit: one(habit, {
			fields: [habitCompletion.habitId],
			references: [habit.id],
		}),
	}),
);

export const habitCompletionInsertSchema = createInsertSchema(
	habitCompletion,
).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
