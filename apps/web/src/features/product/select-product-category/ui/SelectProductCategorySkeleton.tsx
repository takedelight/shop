import { Skeleton } from "@shop/ui";

export const SelectProductCategorySkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      <Skeleton className="h-14 rounded-2xl" />
    </div>
  );
};
