import { z } from "zod/v4";

export const attributeTypeSchema = z.enum(["string", "number", "boolean"], {
  message: "Оберіть коректний тип даних",
});

export const categoryAttributeSchema = z.object({
  key: z
    .string()
    .min(1, "JSON Key обов'язковий")
    .max(100, "Ключ занадто довгий")
    .regex(
      /^[a-z0-9_]+$/,
      "JSON Key повинен містити лише малі літери, цифри та нижнє підкреслення (напр. ram_gb)",
    ),
  label: z.string().min(1, "Назва обов'язкова").max(255, "Назва занадто довга"),
  type: attributeTypeSchema,
  unit: z.string().max(50, "Одиниця виміру занадто довга").nullish(),
  isRequired: z.boolean(),
});

export const createCategoryAttributeSchema = categoryAttributeSchema;

export const updateCategoryAttributeSchema = categoryAttributeSchema.partial().extend({
  key: categoryAttributeSchema.shape.key,
});

export const attributeKeyParamsSchema = categoryAttributeSchema.pick({
  key: true,
});

export type AttributeType = z.infer<typeof attributeTypeSchema>;
export type CategoryAttribute = z.infer<typeof categoryAttributeSchema>;
export type CreateCategoryAttributeInput = z.infer<typeof createCategoryAttributeSchema>;
export type UpdateCategoryAttributeInput = z.infer<typeof updateCategoryAttributeSchema>;
