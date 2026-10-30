"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@shop/ui";
import { useRouter } from "next/navigation";
import { useForm, useFormContext } from "react-hook-form";

import { CreateProductInput, CreateProductOutput, createProductSchema } from "@/entities/product";
import { createProductAction } from "@/features/product/create-product-form/api/create-product.action";

export const useCreateProductForm = () => {
  return useForm<CreateProductInput, unknown, CreateProductOutput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      imageUrl: [],
      price: "1.00",
      stock: 0,
      categoryId: "",
    },
  });
};

export const useCreateProduct = () => {
  const form = useFormContext<CreateProductInput, unknown, CreateProductOutput>();
  const router = useRouter();

  const onSubmit = async (data: CreateProductOutput) => {
    form.clearErrors("root");

    try {
      const result = await createProductAction(data);

      if (!result.success) {
        const errorMessage = result.error ?? "Не вдалося створити товар";

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
        description: "Товар успішно створено!",
      });

      form.reset();

      router.refresh();
      router.push("/admin/products");
    } catch (error) {
      toast.add({
        type: "error",
        title: "Помилка",
        description: error instanceof Error ? error.message : "Не вдалося створити товар",
      });
    }
  };

  return { form, onSubmit };
};
