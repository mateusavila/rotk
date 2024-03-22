import type { Config } from "drizzle-kit";

export default {
  schema: "./server/schemas/index.ts",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url: process.env.NUXT_TURSO_DB_URL as string,
    authToken: process.env.NUXT_TURSO_DB_AUTH_TOKEN,
  },
} satisfies Config;
