import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const timestamps = {
	createdAt: integer({ mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: integer({ mode: "timestamp" })
		.default(sql`(unixepoch())`)
		.$onUpdate(() => new Date()),
};
