"use server";

import { db } from "@/shared/db";
import { ActionResult } from "@/shared/types";
import "server-only";

import { Category } from "../model/category.schema";

export async function getCategoriesAction(): Promise<ActionResult<Category[]>> {
  const categories = await db.query.category.findMany();

  return {
    success: true,
    data: categories,
  };
}
