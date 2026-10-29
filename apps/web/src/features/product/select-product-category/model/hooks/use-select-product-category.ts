import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { getCategoryByIdAction } from "@/core/api/category";
import { Category } from "@/entities/category";
import { CreateProductInput } from "@/entities/product";
import { useSearchParams } from "@/shared/hooks";

export const useSelectProductCategory = (categories: Category[]) => {
  const form = useFormContext<CreateProductInput>();
  const router = useRouter();
  const createUrl = useSearchParams();

  const categoryId = useWatch({ control: form.control, name: "categoryId" });

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.setValue("attributes", {});
    form.clearErrors("attributes");

    if (!categoryId) {
      setCategory(null);
      setIsLoading(false);
      return;
    }

    setCategory(null);
    setIsLoading(true);

    let isActual = true;

    getCategoryByIdAction(categoryId)
      .then((result) => {
        if (!isActual) return;

        setCategory(result.success ? result.data : null);
        setIsLoading(false);
      })
      .catch(() => {
        if (!isActual) return;

        setCategory(null);
        setIsLoading(false);
      });

    return () => {
      isActual = false;
    };
  }, [categoryId, form]);

  const options = categories.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const onCategoryChange = (selectedCategoryId: string) => {
    router.push(createUrl("categoryId", selectedCategoryId), { scroll: false });
  };

  return {
    form,
    options,
    onCategoryChange,
    attributes: category?.attributes ?? [],
    isLoading,
  };
};
