import { TextareaField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

interface CreateProductDescriptionFieldProps {
  control: Control<CreateProductInput>;
}

export const CreateProductDescriptionField = ({ control }: CreateProductDescriptionFieldProps) => {
  return (
    <Controller
      name="description"
      control={control}
      render={({ field, fieldState }) => (
        <TextareaField
          {...field}
          value={field.value ?? ""}
          id="product-desc"
          label="Опис товару"
          rows={5}
          placeholder="Опишіть переваги, комплектацію та деталі товару..."
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
