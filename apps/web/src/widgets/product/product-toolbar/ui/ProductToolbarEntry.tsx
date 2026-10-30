"use client";

import { RiAddLine, RiSearch2Line } from "@remixicon/react";
import { buttonVariants, cn, InputField } from "@shop/ui";
import Link from "next/link";

export const ProductToolbarEntry = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="w-full sm:w-72">
        <InputField
          id="product-search"
          name="search"
          type="search"
          placeholder="Пошук товарів..."

          icon={<RiSearch2Line className="size-4 text-muted-foreground" />}
        />
      </div>

      <Link className={cn(buttonVariants({ variant: "default" }))} href="/admin/products/create">
        <RiAddLine className="mr-1 size-4" />
        Додати товар
      </Link>
    </div>
  );
};
