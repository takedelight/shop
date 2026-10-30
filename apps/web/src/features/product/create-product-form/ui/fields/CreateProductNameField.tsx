import { InputField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

interface CreateProductNameFieldProps {
  control: Control<CreateProductInput>;
  onNameChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void,
  ) => void;
}

export const CreateProductNameField = ({ control, onNameChange }: CreateProductNameFieldProps) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <InputField
          {...field}
          id="product-name"
          label="Назва товару"
          placeholder="напр. Ноутбук Lenovo ThinkPad E14"
          error={fieldState.error?.message}
          onChange={(e) => onNameChange(e, field.onChange)}
        />
      )}
    />
  );
};
