import type { Metadata } from "next";

import { Suspense } from "react";

import { getCategoriesAction } from "@/core/api/category";
import { CategoryTableEntry, CategoryTableSkeleton } from "@/widgets/categories-table";
import { CategoriesToolbar } from "@/widgets/categories-toolbar";

export const metadata: Metadata = {
  title: "Категорії",
};

const CategoriesTableServer = async () => {
  const data = await getCategoriesAction();
  const categories = data.data ?? [];

  return <CategoryTableEntry categories={categories} />;
};

const CategoriesPage = async () => {
  return (
    <div>
      <CategoriesToolbar />

      <Suspense fallback={<CategoryTableSkeleton />}>
        <CategoriesTableServer />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;
