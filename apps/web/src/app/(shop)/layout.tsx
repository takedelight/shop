import { Suspense } from "react";

import { HeaderEntry } from "@/widgets/header";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <div className="border-b py-2">
            <div className="container mx-auto flex justify-between px-2">Loading...</div>
          </div>
        }
      >
        <HeaderEntry />
      </Suspense>

      <main className="flex-1">{children}</main>
    </>
  );
}
