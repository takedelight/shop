"use client";

import { RiAddLine, RiSearch2Line } from "@remixicon/react";
import { buttonVariants, cn, Input } from "@shop/ui";
import Link from "next/link";

export const CategoriesToolbar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex h-9 items-center gap-2 rounded-4xl border border-input bg-transparent px-3 text-muted-foreground transition-colors focus-within:border-ring focus-within:ring-1 focus-within:ring-ring">
        <RiSearch2Line className="size-4 shrink-0" />
        <Input
          type="text"
          placeholder="Пошук категорій..."
          className="h-full border-0 bg-transparent p-0 text-base! shadow-none ring-0 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>

      <Link className={cn(buttonVariants({ variant: "default" }))} href="/admin/categories/create">
        <RiAddLine />
        Створити категорію
      </Link>
    </div>
  );
};
