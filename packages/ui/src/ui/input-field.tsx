import { cn } from "cn";
import * as React from "react";

import { Field, FieldDescription, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import { Show } from "./show";

export interface InputFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const InputField = ({
  className,
  label,
  description,
  error,
  icon,
  id,
  disabled,
  ref,
  ...props
}: InputFieldProps) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <Field className="w-full">
      <div
        className={cn(
          "group relative flex h-14 w-full items-center rounded-2xl bg-input px-4 transition-colors",
          "hover:bg-input/80 focus-within:bg-input/80",
          "focus-within:ring-2 focus-within:ring-primary",
          disabled && "cursor-not-allowed opacity-50",
          error && "focus-within:ring-destructive ",
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

          <Input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={cn(
              "h-auto w-full truncate border-0 border-none bg-transparent p-0 text-[16px]! font-normal! leading-tight! text-foreground shadow-none ring-0 outline-none placeholder:text-muted-foreground/50",
              "focus:border-none focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:outline-none focus-visible:ring-0",
            )}
            {...props}
          />
        </div>

        <Show when={!!icon}>
          <div className="flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors group-focus-within:text-primary">
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
