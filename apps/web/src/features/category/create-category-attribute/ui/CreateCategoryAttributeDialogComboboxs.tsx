import { ComboboxField, SelectField } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CategoryAttribute } from "@/entities/category";

import { COMMON_UNITS, TYPE_OPTIONS } from "../model/const/options";

interface CreateCategoryAttributeDialogComboboxsProps {
  control: Control<CategoryAttribute>;
}

export const CreateCategoryAttributeDialogComboboxs = ({
  control,
}: CreateCategoryAttributeDialogComboboxsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <SelectField
            id="attr-type"
            name={field.name}
            label="Тип даних"
            options={TYPE_OPTIONS}
            value={field.value ?? "string"}
            onValueChange={field.onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="unit"
        render={({ field }) => (
          <ComboboxField
            id="attr-unit"
            name={field.name}
            label="Од. виміру"
            placeholder="Оберіть або введіть"
            emptyText="Одиницю не знайдено"
            options={COMMON_UNITS}
            value={field.value ?? ""}
            onValueChange={(val) => field.onChange(val || null)}
          />
        )}
      />
    </div>
  );
};
