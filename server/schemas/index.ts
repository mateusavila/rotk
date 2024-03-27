import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  avatar: text("avatar"),
  level: integer('level', { mode: "number" })
})

export const generals = sqliteTable("generals", {
  id: text("id").primaryKey(),
  name: text("name"),
  slug: text("slug"),
  avatar: text("avatar"),
  skills: text("skills", { mode: "json" }),
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
  stats: text("stats", { mode: "json" }),
  advanced_stats: text("advanced_stats", { mode: "json" }),
  deletedAt: integer('deletedAt', { mode: 'boolean' })
})
