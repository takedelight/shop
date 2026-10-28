"use server";

import { category } from "@shop/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import "server-only";
import { headers } from "next/headers";

import { auth } from "@/core/auth/auth";
import { db } from "@/core/db";
import { ActionResult } from "@/shared/types";

export async function deleteCategoryAction(categoryId: string): Promise<ActionResult> {
  const reqHeaders = await headers();
  const { success: hasPermission } = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        category: ["delete"],
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

  try {
    const [deletedCategory] = await db
      .delete(category)
      .where(eq(category.id, categoryId))
      .returning();

    revalidatePath("/");

    return {
      success: true,
      data: deletedCategory,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Не вдалося видалити категорію",
    };
  }
}
