"use client";

import { InputField } from "@shop/ui";
import { Controller } from "react-hook-form";

import { useCreateCategory } from "../model/hooks/use-create-category";
import { CreateCategoryForm } from "./CreateCategoryForm";

export const CreateCategoryFormEntry = () => {
  const { control, formState, onSubmit, handleSubmit } = useCreateCategory();

  return (
    <CreateCategoryForm onSubmit={handleSubmit(onSubmit)}>
      <CreateCategoryForm.Header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <InputField
                id="category-name"
                label="Назва категорії"
                {...field}
                error={formState.errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <InputField
                id="category-slug"
                label="Slug (URL)"
                {...field}
                error={formState.errors.slug?.message}
                value={field.value ?? ""}
              />
            )}
          />
        </div>
      </CreateCategoryForm.Header>
    </CreateCategoryForm>
  );
};
