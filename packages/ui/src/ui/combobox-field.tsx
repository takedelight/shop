"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { RiArrowDownSLine } from "@remixicon/react";
import { cn } from "cn";
import * as React from "react";

import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxItem, ComboboxList } from "./combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Show } from "./show";

export interface ComboboxOption<T = unknown> {
  label: string;
  value: string;
  disabled?: boolean;
  data?: T;
}

export interface ComboboxFieldProps<
  Value = string,
  Multiple extends boolean | undefined = false,
  T = unknown,
> extends Omit<ComboboxPrimitive.Root.Props<Value, Multiple>, "children"> {
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  emptyText?: string;
  options: ComboboxOption<T>[];
  className?: string;
  id?: string;
  renderOption?: (option: ComboboxOption<T>) => React.ReactNode;
}

export const ComboboxField = <
  Value = string,
  Multiple extends boolean | undefined = false,
  T = unknown,
>({
  className,
  label,
  description,
  error,
  placeholder = "Оберіть або введіть...",
  emptyText = "Нічого не знайдено",
  options,
  id,
  disabled,
  renderOption,
  ...props
}: ComboboxFieldProps<Value, Multiple, T>) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <Field className="w-full">
      <Combobox items={options} disabled={disabled} {...props}>
        <div
          className={cn(
            "group relative flex h-14! w-full items-center justify-between rounded-2xl bg-input px-4 transition-colors",
            "hover:bg-input/80 focus-within:bg-input/80",
            "focus-within:ring-2 focus-within:ring-primary",
            disabled && "cursor-not-allowed opacity-50",
            error && "focus-within:ring-destructive",
            className,
          )}
        >
          <div className="flex flex-1 flex-col justify-center min-w-0 pr-2">
            <Show when={!!label}>
              <FieldLabel
                htmlFor={inputId}
                className={cn(
                  "cursor-pointer truncate text-xs leading-tight text-muted-foreground select-none transition-colors",
                  "group-focus-within:text-primary",
                  error && "text-destructive group-focus-within:text-destructive",
                )}
              >
                {label}
              </FieldLabel>
            </Show>

            <ComboboxPrimitive.Input
              id={inputId}
              placeholder={placeholder}
              disabled={disabled}
              className={cn(
                "h-auto w-full truncate border-0 border-none bg-transparent p-0 text-[16px]! font-normal! leading-tight! text-foreground shadow-none ring-0 outline-none placeholder:text-muted-foreground/50",
                "focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0",
              )}
            />
          </div>

          <ComboboxPrimitive.Trigger
            tabIndex={-1}
            className="flex size-6 shrink-0 items-center justify-center cursor-pointer text-muted-foreground transition-colors group-focus-within:text-primary"
          >
            <RiArrowDownSLine className="size-5 pointer-events-none" />
          </ComboboxPrimitive.Trigger>
        </div>

        <ComboboxContent
          side="bottom"
          sideOffset={6}
          align="start"
          className="rounded-xl border border-border bg-popover text-popover-foreground shadow-md p-1"
        >
          <ComboboxEmpty className="py-2.5 text-center text-xs text-muted-foreground">
            {emptyText}
          </ComboboxEmpty>
          <ComboboxList className="space-y-0.5 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <ComboboxItem
                key={opt.value}
                value={opt.value}
                disabled={opt.disabled}
                className="cursor-pointer rounded-lg py-2.5 pr-8 pl-3 text-sm hover:bg-accent data-highlighted:bg-accent"
              >
                {renderOption ? renderOption(opt) : opt.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Show when={!!description}>
        <FieldDescription>{description}</FieldDescription>
      </Show>

      <Show when={!!error}>
        <FieldError>{error}</FieldError>
      </Show>
    </Field>
  );
};
