import type { Metadata } from "next";

import { buttonVariants } from "@shop/ui";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
};

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <p className="font-heading text-7xl font-semibold tracking-tight">404</p>
      <h1 className="max-w-md text-center font-heading text-2xl font-semibold tracking-tight text-balance">
        Сторінку не знайдено
      </h1>
      <p className="text-muted-foreground">Такої сторінки не існує або її було переміщено.</p>
      <Link className={buttonVariants()} href="/">
        На головну
      </Link>
    </div>
  );
}
