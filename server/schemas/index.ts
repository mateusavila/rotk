import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const generals = sqliteTable("generals", {
  id: text("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  avatar: text("avatar"),
  skills: text("skills", { mode: "json" }), // convert to json
  bio: text("bio"),
  birth: integer("birth", { mode: "number" }),
  luck: integer("luck", { mode: "number" }),
  health: integer("health", { mode: "number" }),
  soldiers: integer("soldiers", { mode: "number" }),
  loyalty: integer("loyalty", { mode: "number" }),
  navigation: integer("navigation", { mode: "boolean" }),
  is_ruler: integer("is_ruler", { mode: "boolean" }),
  navy_command: integer("navy_command", { mode: "number" }),
  army_command: integer("army_command", { mode: "number" }),
  stats: text("stats", { mode: "json" }), // convert to json
  advanced_stats: text("advanced_stats", { mode: "json" }),
});
