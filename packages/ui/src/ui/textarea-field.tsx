import { cn } from "cn";
import * as React from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Show } from "./show";

export interface TextareaFieldProps extends React.ComponentProps<"textarea"> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const TextareaField = ({
  className,
  label,
  description,
  error,
  icon,
  id,
  disabled,
  rows = 4,
  ref,
  ...props
}: TextareaFieldProps) => {
  const generatedId = React.useId();
  const textareaId = id || generatedId;

  return (
    <Field className="w-full">
      <div
        className={cn(
          "group relative flex min-h-[120px] w-full items-start rounded-2xl bg-input px-4 py-3 transition-colors",
          "hover:bg-input/80 focus-within:bg-input/80",
          "focus-within:ring-2 focus-within:ring-primary",
          disabled && "cursor-not-allowed opacity-50",
          error && "focus-within:ring-destructive",
          className,
        )}
      >
        <div className="flex flex-1 flex-col justify-start min-w-0 pr-2">
          <Show when={!!label}>
            <FieldLabel
              htmlFor={textareaId}
              className={cn(
                "cursor-pointer truncate pb-1 text-xs leading-tight text-muted-foreground select-none transition-colors",
                "group-focus-within:text-primary",
                error && "text-destructive group-focus-within:text-destructive",
              )}
            >
              {label}
            </FieldLabel>
          </Show>

          <textarea
            id={textareaId}
            ref={ref}
            rows={rows}
            disabled={disabled}
            className={cn(
              "w-full resize-none border-0 border-none bg-transparent p-0 text-[16px]! font-normal! leading-relaxed text-foreground shadow-none ring-0 outline-none placeholder:text-muted-foreground/50",
              "focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0",
            )}
            {...props}
          />
        </div>

        <Show when={!!icon}>
          <div className="flex size-6 shrink-0 items-center justify-center pt-0.5 text-muted-foreground transition-colors group-focus-within:text-primary">
            {icon}
          </div>
        </Show>
      </div>

      <Show when={!!description}>
        <FieldDescription>{description}</FieldDescription>
      </Show>

      <Show when={!!error}>
        <FieldError>{error}</FieldError>
      </Show>
    </Field>
  );
};
