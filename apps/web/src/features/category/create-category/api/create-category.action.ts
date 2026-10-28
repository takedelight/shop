"use server";

import { category } from "@shop/db";
import "server-only";
import { headers } from "next/headers";

import { auth } from "@/core/auth/auth";
import { db } from "@/core/db";
import { CreateCategoryInput, createCategorySchema } from "@/entities/category";
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
      data: null,
      error: "Недостатньо прав для виконання цієї дії",
    };
  }

  const parsed = createCategorySchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      data: null,
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
      return { success: false, data: null, error: "Категорія з таким slug вже існує" };
    }
    return { success: false, data: null, error: "Не вдалося зберегти категорію" };
  }
}
