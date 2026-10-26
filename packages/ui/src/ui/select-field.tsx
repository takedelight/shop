import { Select } from "@base-ui/react/select";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";
import { cn } from "cn";
import * as React from "react";

import { FieldLabel } from "../ui/field";
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
> extends Select.Root.Props<Value, Multiple> {
  label?: string;
  placeholder?: string;
  options: SelectOption<T>[];
  className?: string;
  triggerId?: string;
  renderOption?: (option: SelectOption<T>) => React.ReactNode;
}

export const SelectField = <
  Value = string,
  Multiple extends boolean | undefined = false,
  T = unknown,
>({
  label,
  placeholder = "Оберіть значення",
  options,
  className,
  triggerId,
  renderOption,
  ...props
}: SelectFieldProps<Value, Multiple, T>) => {
  const generatedId = React.useId();
  const id = triggerId || generatedId;

  return (
    <Select.Root items={options} {...props}>
      <Select.Trigger
        id={id}
        className={cn(
          "group relative flex h-14! w-full items-center justify-between rounded-2xl border-0 bg-input px-4 text-left shadow-none transition-colors outline-none",
          "hover:bg-input/80 focus:bg-input/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <div className="flex flex-1 flex-col justify-center min-w-0 pr-2">
          <Show when={!!label}>
            <FieldLabel
              htmlFor={id}
              className="cursor-pointer truncate text-xs leading-tight text-muted-foreground select-none transition-colors group-focus-visible:text-primary"
            >
              {label}
            </FieldLabel>
          </Show>

          <Select.Value
            placeholder={placeholder}
            className="truncate text-[16px] font-normal leading-tight text-foreground data-placeholder:text-muted-foreground/50"
          />
        </div>

        <Select.Icon className="flex size-5 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180 group-focus-visible:text-primary">
          <RiArrowDownSLine className="size-5" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner
          side="bottom"
          align="start"
          sideOffset={2}
          alignItemWithTrigger={false}
          className="z-50 w-[var(--anchor-width)] min-w-[var(--anchor-width)] outline-none"
        >
          <Select.Popup className="max-h-72 overflow-y-auto rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none origin-(--transform-origin)">
            <Select.List className="space-y-0.5">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  className={cn(
                    "relative flex w-full cursor-pointer select-none items-center justify-between rounded-lg px-3 py-2.5 text-sm outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                    "data-disabled:pointer-events-none data-disabled:opacity-50",
                  )}
                >
                  <Select.ItemText className="truncate">
                    {renderOption ? renderOption(opt) : opt.label}
                  </Select.ItemText>

                  <Select.ItemIndicator className="flex size-4 items-center justify-center text-primary">
                    <RiCheckLine className="size-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
};
