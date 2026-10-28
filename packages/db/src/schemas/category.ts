import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export type AttributeType = "string" | "number" | "boolean";

export type CategoryAttribute = {
  key: string;
  label: string;
  type: AttributeType;
  unit?: string | null;
  isRequired: boolean;
};

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  attributes: jsonb("attributes").$type<CategoryAttribute[]>().default([]).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export type CategoryTable = typeof category.$inferSelect;
export type NewCategoryTable = typeof category.$inferInsert;
