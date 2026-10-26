interface ShowProps {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const Show = ({ when, children, fallback }: ShowProps) => {
  return when ? <>{children}</> : (fallback ?? null);
};
