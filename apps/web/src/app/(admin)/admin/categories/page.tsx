import type { Metadata } from "next";

import { RiSearch2Line } from "@remixicon/react";
import { Input } from "@shop/ui";

import { CreateCategoryEntry } from "@/features/category/create-category";

export const metadata: Metadata = {
  title: "Категорії",
};

const CategoriesPage = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex h-9 items-center gap-2 rounded-4xl border border-input bg-transparent px-3 text-muted-foreground transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
        <RiSearch2Line className="size-4 shrink-0" />
        <Input
          type="text"
          placeholder="Пошук категорій..."
          className="h-full border-0 bg-transparent p-0 text-base! shadow-none ring-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
      <CreateCategoryEntry />
    </div>
  );
};

export default CategoriesPage;
