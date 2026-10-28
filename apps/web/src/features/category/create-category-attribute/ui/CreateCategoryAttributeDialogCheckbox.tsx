import { CheckboxField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CategoryAttribute } from "@/entities/category";

interface CreateCategoryAttributeDialogCheckboxProps {
  control: Control<CategoryAttribute>;
}

export const CreateCategoryAttributeDialogCheckbox = ({
  control,
}: CreateCategoryAttributeDialogCheckboxProps) => {
  return (
    <div className="pt-1">
      <Controller
        control={control}
        name="isRequired"
        render={({ field, fieldState }) => (
          <CheckboxField
            id="attr-required"
            name={field.name}
            label="Обов'язкове поле"
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            error={fieldState.error?.message}
          />
        )}
      />
    </div>
  );
};
