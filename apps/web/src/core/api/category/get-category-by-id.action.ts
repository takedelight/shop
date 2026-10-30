"use server";

import { category } from "@shop/db";
import { eq } from "drizzle-orm";
import "server-only";

import { db } from "@/core/db";
import { Category } from "@/entities/category";
import { ActionResult } from "@/shared/types";

export async function getCategoryByIdAction(categoryId: string): Promise<ActionResult<Category>> {
  try {
    const foundCategory = await db.query.category.findFirst({
      where: eq(category.id, categoryId),
    });

    if (!foundCategory) {
      return {
        success: false,
        data: null,
        error: "Категорію не знайдено",
      };
    }

    return {
      success: true,
      data: foundCategory,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Не вдалося отримати категорію",
    };
  }
}
