import { Suspense } from "react";

import { getCategoriesAction } from "@/core/api/category";
import { SelectProductCategorySkeleton } from "@/features/product/select-product-category";
import { CreateProductEntry, CreateProductProvider } from "@/widgets/product/create-product";

const CreateProductEntryServer = async () => {
  const categories = await getCategoriesAction();

  return <CreateProductEntry categories={categories.data ?? []} />;
};

export default function CreateProductPage() {
  return (
    <CreateProductProvider>
      <Suspense fallback={<SelectProductCategorySkeleton />}>
        <CreateProductEntryServer />
      </Suspense>
    </CreateProductProvider>
  );
}
