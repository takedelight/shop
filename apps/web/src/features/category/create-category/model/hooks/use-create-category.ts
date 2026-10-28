"use client";

import { toast } from "@shop/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { CreateCategoryInput } from "@/entities/category";

import { createCategoryAction } from "../../api/create-category.action";

export const useCreateCategory = () => {
  const form = useFormContext<CreateCategoryInput>();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (values: CreateCategoryInput) => {
    form.clearErrors("root");

    try {
      const result = await createCategoryAction(values);

      if (!result.success) {
        const errorMessage = result.error ?? "Не вдалося створити категорію";
        form.setError("root", {
          type: "server",
          message: errorMessage,
        });

        toast.add({
          type: "error",
          title: "Помилка",
          description: errorMessage,
        });
        return;
      }

      toast.add({
        type: "success",
        title: "Успіх",
        description: "Категорію успішно створено!",
      });

      form.reset();

      router.refresh();
      router.push(`/admin/categories`);

      setIsOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Помилка",
        description: error instanceof Error ? error.message : "Не вдалося створити категорію",
      });
    }
  };

  return { onSubmit, isOpen, setIsOpen, ...form };
};
