"use client";

import { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";

import { useCreateCategory } from "../hooks/use-create-category";

export const CreateCategoryFormProvider = ({ children }: PropsWithChildren) => {
  const { form } = useCreateCategory();

  return <FormProvider {...form}>{children}</FormProvider>;
};
