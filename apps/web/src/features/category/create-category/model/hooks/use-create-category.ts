"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@shop/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { CreateCategoryInput, createCategorySchema } from "@/entities/category";

import { createCategoryAction } from "../../api/create-category.action";

export const useCreateCategory = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { formState, ...form } = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

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

      setIsOpen(false);
    } catch (error) {
      toast.add({
        type: "error",
        title: "Помилка",
        description: error instanceof Error ? error.message : "Не вдалося створити категорію",
      });
    }
  };

  return { formState, onSubmit, isOpen, setIsOpen, ...form };
};
