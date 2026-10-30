import { decimal, integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { category } from "./category";

export type ProductAttributeValue = string | number | boolean;

export const product = pgTable("product", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => category.id, { onDelete: "restrict" })
    .notNull(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  imageUrl: text("image_url").array().notNull().default([]),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").notNull().default(0),
  attributes: jsonb("attributes")
    .$type<Record<string, ProductAttributeValue>>()
    .default({})
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});
