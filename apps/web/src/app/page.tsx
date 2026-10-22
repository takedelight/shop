import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@shop/ui";
import Link from "next/link";

import { OrderPreview } from "@/widgets/order-preview";

export default function Home() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 p-6 md:p-10">
        <div className="flex max-w-md flex-col gap-4">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance">
            Усі твої замовлення — під повним контролем
          </h1>
          <p className="text-muted-foreground">
            Стеж за статусом доставки в реальному часі, зберігай історію покупок та повторюй
            замовлення в один клік.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Button render={<Link href="/auth/register" />}>
              Створити акаунт
              <RiArrowRightLine data-icon="inline-end" />
            </Button>
            <Button variant="ghost" render={<Link href="/auth/login" />}>
              Увійти
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden items-center justify-center bg-muted p-6 lg:flex">
        <OrderPreview />
      </div>
    </div>
  );
}
