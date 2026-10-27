import { RiDeleteBinLine, RiListCheck2 } from "@remixicon/react";
import { Button, ScrollArea, ScrollBar, Show } from "@shop/ui";

import { CreateAttributeDialogEntry } from "@/features/category/create-category-attribute";

interface AttributeItem {
  id: string;
  key: string;
  label: string;
  type: string;
  unit?: string;
  isRequired: boolean;
}

const mockAttributes: AttributeItem[] = [];

export const CategoryAttributesListEntry = () => {
  return (
    <Show
      className="h-130"
      when={!!mockAttributes.length}
      fallback={
        <ScrollArea className="flex h-130! flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border/80 bg-input/30 px-4 py-8 text-center">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <RiListCheck2 className="size-5" />
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Немає доданих характеристик</p>
              <p className="text-xs text-muted-foreground">
                Натисніть «Додати поле», щоб створити першу характеристику
              </p>

              <CreateAttributeDialogEntry size="sm" />
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      }
    >
      {mockAttributes.map((attr) => (
        <div
          key={attr.id}
          className="flex items-center justify-between gap-4 py-3.5 transition-colors"
        >
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium text-foreground">{attr.label}</span>
              {attr.isRequired && (
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Обов&apos;язкове
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                {attr.key}
              </code>
              <span>•</span>
              <span>Тип: {attr.type}</span>
              {attr.unit && (
                <>
                  <span>•</span>
                  <span>Од. виміру: {attr.unit}</span>
                </>
              )}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <RiDeleteBinLine className="size-4" />
          </Button>
        </div>
      ))}
    </Show>
  );
};
