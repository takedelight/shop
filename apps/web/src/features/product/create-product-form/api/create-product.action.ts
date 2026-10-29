"use server";

import { product } from "@shop/db";
import { headers } from "next/headers";
import "server-only";

import { auth } from "@/core/auth/auth";
import { db } from "@/core/db";
import { CreateProductInput, createProductSchema } from "@/entities/product";
import { ActionResult } from "@/shared/types";

export async function createProductAction(input: CreateProductInput): Promise<ActionResult> {
  const reqHeaders = await headers();
  const { success: hasPermission } = await auth.api.userHasPermission({
    headers: reqHeaders,
    body: {
      permissions: {
        product: ["create"],
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

  const parsed = createProductSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      data: null,
      error: parsed.error.issues[0]?.message ?? "Помилка валідації даних",
    };
  }

  try {
    const [newProduct] = await db.insert(product).values(parsed.data).returning();

    return {
      success: true,
      data: newProduct,
    };
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "23505") {
      return { success: false, data: null, error: "Товар з таким slug вже існує" };
    }

    return { success: false, data: null, error: "Не вдалося створити товар" };
  }
}
