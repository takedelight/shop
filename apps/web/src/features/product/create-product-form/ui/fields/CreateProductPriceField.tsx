import { InputField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

interface CreateProductPriceFieldProps {
  control: Control<CreateProductInput>;
}

export const CreateProductPriceField = ({ control }: CreateProductPriceFieldProps) => {
  return (
    <Controller
      name="price"
      control={control}
      render={({ field, fieldState }) => (
        <InputField
          {...field}
          id="product-price"
          type="number"
          min="1"
          step="0.01"
          label="Ціна (₴)"
          placeholder="1.00"
          error={fieldState.error?.message}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || Number(val) >= 1) {
              field.onChange(val);
            }
          }}
        />
      )}
    />
  );
};
