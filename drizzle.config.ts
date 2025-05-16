import type { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
	schema: "./src/server/db/schema",
	dialect: "turso",
	casing: "snake_case",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
} satisfies Config;
