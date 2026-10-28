import { NextResponse } from "next/server";

import { getCategoriesAction } from "@/core/api/category";

export async function GET() {
  const result = await getCategoriesAction();

  return NextResponse.json(result, {
    status: result.success ? 200 : 500,
  });
}
