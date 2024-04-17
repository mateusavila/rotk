import { sql } from "drizzle-orm"
import { sqliteTable, text, integer, AnySQLiteColumn } from "drizzle-orm/sqlite-core"

export const pages = sqliteTable("pages", {
  id: text("id").primaryKey(),
  title: text("title"),
  slug: text("slug"),
  content: text("content"),
  author_id: integer("author_id").references((): AnySQLiteColumn => user.id),
  date: text("date").default(sql`(CURRENT_DATE)`),
})

export const meta_pages = sqliteTable("meta_pages", {
  id: text("id").primaryKey(),
  key: text("key"),
  value: text("value"),
  type: text("type"),
  pages_id: text("pages_id").references((): AnySQLiteColumn => pages.id),
})

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
  death: integer("death", { mode: "number" }),
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

export const generalStats = sqliteTable("generalStats", {
  id: text("id").primaryKey(),
  slug: text("slug"),
  game: text("game"),
  stat: text("stat"),
  value: integer("value", { mode: "number" })
})

export const hiperlinks = sqliteTable("hiperlinks", {
  id: text("id").primaryKey(),
  slug: text("slug"),
  label: text("label"),
  url: text("url")
})

export const rival = sqliteTable("rival", {
  id: text("id").primaryKey(),
  slug: text("slug"),
  rival: text("rival")
})

