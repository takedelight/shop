import { useFormContext } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

import { useProductSlugSync } from "./use-product-slug";

export const useCreateProductForm = () => {
  const form = useFormContext<CreateProductInput>();

  const { handleNameChange, handleSlugChange } = useProductSlugSync();

  return { form, handleNameChange, handleSlugChange };
};
