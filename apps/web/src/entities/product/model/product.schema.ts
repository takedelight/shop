import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid({ message: "Некоректний формат ID товару" }),
  categoryId: z.string().uuid({ message: "Некоректний ID категорії" }),
  name: z
    .string()
    .min(1, "Назва обов'язкова")
    .max(255, "Назва занадто довга (максимум 255 символів)"),
  slug: z
    .string()
    .min(1, "Slug обов'язковий")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug повинен містити лише малі латинські літери, цифри та дефіси",
    ),
  description: z.string().nullable().optional(),
  imageUrl: z.array(z.string().url("Некоректна URL-адреса зображення")),
  price: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Ціна має бути додатним числом із максимум двома знаками після коми",
    ),
  stock: z.coerce
    .number({ error: "Вкажіть числове значення" })
    .int({ message: "Залишок має бути цілим числом" })
    .nonnegative("Залишок не може бути від'ємним"),
  attributes: z
    .record(
      z
        .string()
        .min(1, "Ключ атрибута обов'язковий")
        .max(100, "Ключ атрибута занадто довгий")
        .regex(
          /^[a-z0-9_]+$/,
          "Ключ атрибута повинен містити лише малі літери, цифри та нижнє підкреслення",
        ),
      z.union([z.string(), z.number(), z.boolean()]),
    )
    .default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProductSchema = createProductSchema.partial();

export type Product = z.infer<typeof productSchema>;
export type CreateProductInput = z.input<typeof createProductSchema>;
export type CreateProductOutput = z.output<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
