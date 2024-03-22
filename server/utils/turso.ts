import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

export function useTurso() {
  const turso = useRuntimeConfig().turso;

  if (!turso.url || !turso.authToken) {
    throw new Error(
      "Please fill the NUXT_TURSO_DB_URL and NUXT_TURSO_DB_AUTH_TOKEN env variables",
    );
  }
  const { url, authToken } = turso;
  return drizzle(createClient({ url, authToken }));
}
