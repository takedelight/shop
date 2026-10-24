import { relations } from "drizzle-orm";

import { account } from "./schemas/account";
import { category } from "./schemas/category";
import { session } from "./schemas/session";
import { user } from "./schemas/user";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const categoryRelations = relations(category, ({ one, many }) => ({
  parent: one(category, {
    fields: [category.parentId],
    references: [category.id],
    relationName: "categoryTree",
  }),
  children: many(category, { relationName: "categoryTree" }),
}));
