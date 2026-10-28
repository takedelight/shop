import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryAttribute } from "@shop/db";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { createCategoryAttributeSchema, CreateCategoryInput } from "@/entities/category";

export const useCreateCategoryAttributes = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { append } = useFieldArray<CreateCategoryInput>({
    name: "attributes",
  });

  const form = useForm<CategoryAttribute>({
    defaultValues: {
      key: "",
      label: "",
      type: "string",
      unit: null,
      isRequired: false,
    },
    resolver: zodResolver(createCategoryAttributeSchema),
  });

  const handleSubmit = form.handleSubmit((data) => {
    append(data);
    setIsOpen(false);
  });

  return { ...form, isOpen, setIsOpen, handleSubmit };
};
