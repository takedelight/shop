import { InputField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CategoryAttribute } from "@/entities/category";

interface CreateCategoryAttributeDialogInputsProps {
  control: Control<CategoryAttribute>;
}

export const CreateCategoryAttributeDialogInputs = ({
  control,
}: CreateCategoryAttributeDialogInputsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Controller
        control={control}
        name="key"
        render={({ field, fieldState }) => (
          <InputField id="attr-key" label="JSON Key" error={fieldState.error?.message} {...field} />
        )}
      />

      <Controller
        control={control}
        name="label"
        render={({ field, fieldState }) => (
          <InputField id="attr-label" label="Назва" error={fieldState.error?.message} {...field} />
        )}
      />
    </div>
  );
};
