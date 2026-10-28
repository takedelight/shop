import { useFormContext, useWatch } from "react-hook-form";

import { CreateCategoryInput } from "@/entities/category";

export const useCategoryTableAttributesList = () => {
  const { control } = useFormContext<CreateCategoryInput>();

  const attributes = useWatch({
    control,
    name: "attributes",
    defaultValue: [],
  });

  return {
    attributes,
  };
};
