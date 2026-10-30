"use client";

import { FormProvider } from "react-hook-form";

import { useCreateProductForm } from "../hooks/use-create-product";

export const CreateProductProvider = ({ children }: { children: React.ReactNode }) => {
  const form = useCreateProductForm();

  return <FormProvider {...form}>{children}</FormProvider>;
};
