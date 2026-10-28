"use server";

import { db } from "@/core/db";
import { Category } from "@/entities/category/model/category.schema";
import "server-only";

import { ActionResult } from "@/shared/types";

export async function getCategoriesAction(): Promise<ActionResult<Category[]>> {
  const categories = await db.query.category.findMany();

  return {
    success: true,
    data: categories,
  };
}
