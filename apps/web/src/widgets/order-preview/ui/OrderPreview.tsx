"use client";

import { RiBaseballLine, RiCheckLine, RiRunLine, RiShirtLine, RiTruckLine } from "@remixicon/react";
import {
  Badge,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Separator,
} from "@shop/ui";
import { useEffect, useState } from "react";

const steps = [
  { label: "Оформлено" },
  { label: "Відправлено" },
  { label: "В дорозі" },
  { label: "Доставлено" },
];

const items = [
  {
    name: "Кросівки Air Force 1",
    meta: "Розмір 43 · Чорний",
    price: "4 299 ₴",
    icon: RiRunLine,
    tone: "bg-primary/10 text-primary",
  },
  {
    name: "Футболка Base",
    meta: "Розмір L · Білий",
    price: "899 ₴",
    icon: RiShirtLine,
    tone: "bg-emerald-500/10 text-emerald-600",
  },
  {
    name: "Кепка Logo",
    meta: "One size · Хакі",
    price: "549 ₴",
    icon: RiBaseballLine,
    tone: "bg-amber-500/10 text-amber-600",
  },
] as const;

export const OrderPreview = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((step) => (step + 1) % steps.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const isDelivered = activeStep === steps.length - 1;

  return (
    <Card className="w-full shadow-xl [--card-spacing:--spacing(8)]">
      <CardHeader>
        <CardTitle className="text-2xl">Замовлення #A-1024</CardTitle>
        <CardDescription className="text-base">Від 21 жовтня · Нова пошта</CardDescription>
        <CardAction>
          <Badge className="h-7 px-3.5 text-sm" variant={isDelivered ? "default" : "secondary"}>
            {steps[activeStep].label}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Item key={item.name}>
              <ItemMedia className={`size-14 rounded-2xl ${item.tone}`}>
                <Icon className="size-7" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-lg">{item.name}</ItemTitle>
                <ItemDescription className="text-base">{item.meta}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <span className="text-lg font-semibold tabular-nums">{item.price}</span>
              </ItemActions>
            </Item>
          );
        })}

        <Separator />

        <div className="flex items-center justify-between px-1">
          <span className="text-lg text-muted-foreground">Разом</span>
          <span className="font-heading text-3xl font-semibold tabular-nums">5 747 ₴</span>
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-5 border-t">
        <ol className="flex w-full items-start">
          {steps.map((step, index) => {
            const isDone = index < activeStep;
            const isActive = index === activeStep;

            return (
              <li key={step.label} className="flex flex-1 items-start last:flex-none">
                {index > 0 && (
                  <div
                    aria-hidden
                    className={`mt-5 h-1 min-w-4 flex-1 rounded-full transition-colors ${
                      index <= activeStep ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
                <button
                  type="button"
                  aria-current={isActive}
                  onClick={() => setActiveStep(index)}
                  className="group flex flex-col items-center gap-2 rounded-xl p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <span
                    className={`relative flex size-9 items-center justify-center rounded-full border-2 transition-colors ${
                      isDone || isActive
                        ? "border-primary text-primary-foreground"
                        : "border-border bg-background text-transparent"
                    } ${isDone ? "bg-primary" : "bg-background"}`}
                  >
                    {isDone && <RiCheckLine className="size-5" />}
                    {isActive && (
                      <>
                        <span className="absolute -inset-1.5 animate-ping rounded-full bg-primary/30" />
                        <span className="size-4 rounded-full bg-primary" />
                      </>
                    )}
                  </span>
                  <span
                    className={`text-sm leading-tight whitespace-nowrap ${
                      isActive ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="flex w-full items-center gap-2 text-base text-muted-foreground">
          <RiTruckLine className="size-5 shrink-0" />
          <span>Орієнтовна доставка: завтра</span>
        </div>
      </CardFooter>
    </Card>
  );
};
