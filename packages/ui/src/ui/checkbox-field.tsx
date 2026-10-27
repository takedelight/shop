import { Checkbox, cn, Field, FieldDescription, FieldError, FieldLabel, Show } from "@shop/ui";
import { ComponentProps, useId } from "react";

export interface CheckboxFieldProps extends Omit<ComponentProps<typeof Checkbox>, "id"> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
  id?: string;
  wrapperClassName?: string;
}

export const CheckboxField = ({
  className,
  wrapperClassName,
  label,
  description,
  error,
  id,
  disabled,
  ref,
  ...props
}: CheckboxFieldProps) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <Field className={cn("w-auto", wrapperClassName)}>
      <label
        htmlFor={checkboxId}
        className={cn(
          "group relative flex h-14 cursor-pointer items-center gap-3 rounded-2xl bg-input px-4 transition-colors select-none",
          "focus-within:bg-input/80 focus-within:ring-2 focus-within:ring-primary hover:bg-input/80",
          disabled && "cursor-not-allowed opacity-50",
          error && "focus-within:ring-destructive",
          className,
        )}
      >
        <Checkbox
          id={checkboxId}
          ref={ref}
          disabled={disabled}
          className={cn(
            "size-5 shrink-0 rounded-md border-2 border-muted-foreground/40 bg-background shadow-xs transition-all",
            "hover:border-primary focus-visible:ring-0 focus-visible:outline-none",
            "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            "data-[checked]:border-primary data-[checked]:bg-primary data-[checked]:text-primary-foreground",
            error && "border-destructive focus-within:border-destructive",
          )}
          {...props}
        />

        <Show when={!!label}>
          <FieldLabel
            htmlFor={checkboxId}
            className={cn(
              "cursor-pointer text-sm leading-none font-medium text-foreground transition-colors select-none",
              "group-focus-within:text-primary",
              disabled && "cursor-not-allowed opacity-50",
              error && "text-destructive group-focus-within:text-destructive",
            )}
          >
            {label}
          </FieldLabel>
        </Show>
      </label>

      <Show when={!!description}>
        <FieldDescription>{description}</FieldDescription>
      </Show>

      <Show when={!!error}>
        <FieldError>{error}</FieldError>
      </Show>
    </Field>
  );
};
