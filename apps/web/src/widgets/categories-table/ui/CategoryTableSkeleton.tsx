import { Skeleton } from "@shop/ui";

export const CategoryTableSkeleton = () => {
  return (
    <div className="mt-10 overflow-hidden rounded-md border">
      <div className="border-b p-4">
        <Skeleton className="h-6 w-1/4" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
};
