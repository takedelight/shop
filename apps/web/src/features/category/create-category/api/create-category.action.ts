"use server";

import { headers } from "next/headers";
import "server-only";

import { CreateCategoryInput, createCategorySchema } from "@/entities/category";
import { auth } from "@/shared/auth/auth";
import { category, db } from "@/shared/db";
import { ActionResult } from "@/shared/types";

export async function createCategoryAction(input: CreateCategoryInput): Promise<ActionResult> {
  const reqHeaders = await headers();
  const { success: hasPermission } = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        category: ["create"],
      },
    },
  });

  if (!hasPermission) {
    return {
      success: false,
      error: "Недостатньо прав для виконання цієї дії",
    };
  }

  const parsed = createCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Помилка валідації даних",
    };
  }

  try {
    const [newCategory] = await db.insert(category).values(parsed.data).returning();

    return {
      success: true,
      data: newCategory,
    };
  } catch (err: any) {
    if (err?.code === "23505") {
      return { success: false, error: "Категорія з таким slug вже існує" };
    }
    return { success: false, error: "Не вдалося зберегти категорію" };
  }
}
