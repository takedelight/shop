"use client";

import { RiAddLine, RiSearch2Line } from "@remixicon/react";
import { buttonVariants, cn, InputField } from "@shop/ui";
import Link from "next/link";

interface CategoriesToolbarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CategoriesToolbar = ({ value, onChange }: CategoriesToolbarProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="w-full sm:w-72">
        <InputField
          id="category-search"
          name="search"
          type="search"
          placeholder="Пошук категорій..."
          value={value}
          onChange={onChange}
          icon={<RiSearch2Line className="size-4 text-muted-foreground" />}
        />
      </div>

      <Link className={cn(buttonVariants({ variant: "default" }))} href="/admin/categories/create">
        <RiAddLine className="mr-1 size-4" />
        Створити категорію
      </Link>
    </div>
  );
};
