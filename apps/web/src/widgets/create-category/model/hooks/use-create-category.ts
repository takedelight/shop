import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createCategorySchema } from "@/entities/category";

export const useCreateCategory = () => {
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      attributes: [],
    },
  });

  return { form };
};
