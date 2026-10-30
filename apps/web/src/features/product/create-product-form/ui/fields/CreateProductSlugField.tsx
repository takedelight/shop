import { InputField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

interface CreateProductSlugFieldProps {
  control: Control<CreateProductInput>;
  onSlugChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => void;
}

export const CreateProductSlugField = ({ control, onSlugChange }: CreateProductSlugFieldProps) => {
  return (
    <Controller
      name="slug"
      control={control}
      render={({ field, fieldState }) => (
        <InputField
          {...field}
          id="product-slug"
          label="Slug (URL)"
          placeholder="lenovo-thinkpad-e14"
          error={fieldState.error?.message}
          onChange={(e) => {
            if (onSlugChange) {
              onSlugChange(e, field.onChange);
            } else {
              field.onChange(e);
            }
          }}
        />
      )}
    />
  );
};
