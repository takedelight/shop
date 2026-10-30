"use client";

import { cn } from "cn";
import * as React from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Show } from "../ui/show";

export interface SelectOption<T = unknown> {
  label: string;
  value: string;
  disabled?: boolean;
  data?: T;
}

export interface SelectFieldProps<
  Value = string,
  Multiple extends boolean | undefined = false,
  T = unknown,
> extends Omit<React.ComponentProps<typeof Select<Value, Multiple>>, "onValueChange"> {
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  options: SelectOption<T>[];
  className?: string;
  triggerId?: string;
  onValueChange?: (value: Multiple extends true ? Value[] : Value | null) => void;
  renderOption?: (option: SelectOption<T>) => React.ReactNode;
}

export const SelectField = <
  Value = string,
  Multiple extends boolean | undefined = false,
  T = unknown,
>({
  label,
  placeholder = "Оберіть значення",
  description,
  error,
  options,
  className,
  triggerId,
  renderOption,
  onValueChange,
  ...props
}: SelectFieldProps<Value, Multiple, T>) => {
  const generatedId = React.useId();
  const id = triggerId || generatedId;

  return (
    <Field className="w-full">
      <Select
        items={options}
        onValueChange={(val) => {
          onValueChange?.(val as Multiple extends true ? Value[] : Value | null);
        }}
        {...props}
      >
        <SelectTrigger
          id={id}
          className={cn(
            "group relative flex h-14! w-full items-center justify-between rounded-2xl border-0 bg-input px-4 text-left shadow-none transition-colors outline-none",
            "hover:bg-input/80 focus:bg-input/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "focus-visible:ring-destructive aria-invalid:border-destructive",
            className,
          )}
        >
          <div className="flex flex-1 flex-col justify-center min-w-0 pr-2">
            <Show when={!!label}>
              <FieldLabel
                htmlFor={id}
                className={cn(
                  "cursor-pointer truncate text-xs leading-tight text-muted-foreground select-none transition-colors group-focus-visible:text-primary",
                  error && "text-destructive group-focus-visible:text-destructive",
                )}
              >
                {label}
              </FieldLabel>
            </Show>

            <SelectValue
              placeholder={placeholder}
              className="truncate text-[16px] font-normal leading-tight text-foreground data-placeholder:text-muted-foreground/50"
            />
          </div>
        </SelectTrigger>

        <SelectContent
          side="bottom"
          align="start"
          sideOffset={4}
          alignItemWithTrigger={false}
          className="w-[var(--anchor-width)] min-w-[var(--anchor-width)]"
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {renderOption ? renderOption(opt) : opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Show when={!!description}>
        <FieldDescription>{description}</FieldDescription>
      </Show>

      <Show when={!!error}>
        <FieldError>{error}</FieldError>
      </Show>
    </Field>
  );
};
