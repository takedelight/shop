import { Field, FieldError, SelectField, SelectOption } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

interface SelectProductCategoryFieldProps {
  control: Control<CreateProductInput>;
  options: SelectOption[];
  onCategoryChange: (categoryId: string) => void;
}

export const SelectProductCategoryField = ({
  control,
  options,
  onCategoryChange,
}: SelectProductCategoryFieldProps) => {
  return (
    <Controller
      name="categoryId"
      control={control}
      render={({ field, fieldState }) => (
        <Field className="w-full">
          <SelectField
            id="product-category"
            name={field.name}
            label="Категорія"
            placeholder="Оберіть категорію товару"
            options={options}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value ?? "");

              if (value) {
                onCategoryChange(value);
              }
            }}
          />

          <FieldError>{fieldState.error?.message}</FieldError>
        </Field>
      )}
    />
  );
};
