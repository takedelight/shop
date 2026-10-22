import { RiLoader4Line } from "@remixicon/react";

import { cn } from "../lib";

export function Spinner({
  className,
  children: _children,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <RiLoader4Line className={cn("size-4 animate-spin", className)} aria-hidden="true" {...props} />
  );
}
