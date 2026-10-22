import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@shop/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <h1 className="max-w-md text-center font-heading text-4xl font-semibold tracking-tight text-balance">
        Усі твої замовлення — під повним контролем
      </h1>
      <Button render={<Link href="/auth/register" />}>
        Створити акаунт
        <RiArrowRightLine data-icon="inline-end" />
      </Button>
    </div>
  );
}
