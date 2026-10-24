import { z } from "zod/v4";

// 1. Єдине джерело істини — повна схема сутності в БД
export const categorySchema = z.object({
  id: z.uuid("Некоректний ID категорії"),
  name: z.string().min(1, "Назва обов'язкова").max(255),
  slug: z
    .string()
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug повинен містити лише малі літери, цифри та дефіси")
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 2. Створення: виключаємо системні поля (id, createdAt, updatedAt)
export const createCategorySchema = categorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// 3. Оновлення: робимо поля створення опціональними та повертаємо обов'язковий id
export const updateCategorySchema = createCategorySchema.partial().extend({
  id: categorySchema.shape.id,
});

// 4. Окремі схеми для пошуку / параметрів роутів
export const categoryIdParamsSchema = categorySchema.pick({
  id: true,
});

export const categorySlugParamsSchema = categorySchema.pick({
  slug: true,
});

// 5. Виведення типів
export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
