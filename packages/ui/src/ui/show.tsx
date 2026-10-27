import { ComponentProps } from "react";

interface ShowProps extends ComponentProps<"div"> {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Show = ({ when, children, fallback, className = "", ...props }: ShowProps) => {
  return (
    <div className={className} {...props}>
      {" "}
      {when ? <>{children}</> : (fallback ?? null)}
    </div>
  );
};
