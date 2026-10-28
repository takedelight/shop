import { z } from "zod/v4";

import { categoryAttributeSchema } from "./atrribute.schema";

export const categorySchema = z.object({
  id: z.uuid("Некоректний ID категорії"),
  name: z.string().min(1, "Назва обов'язкова").max(255),
  slug: z
    .string()
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug повинен містити лише малі літери, цифри та дефіси"),
  attributes: z.array(categoryAttributeSchema).default([]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createCategorySchema = categorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  id: categorySchema.shape.id,
});

export const categoryIdParamsSchema = categorySchema.pick({
  id: true,
});

export const categorySlugParamsSchema = categorySchema.pick({
  slug: true,
});

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.input<typeof createCategorySchema>;
export type UpdateCategoryInput = z.input<typeof updateCategorySchema>;
