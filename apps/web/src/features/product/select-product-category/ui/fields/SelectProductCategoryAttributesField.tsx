import { CheckboxField, InputField, Skeleton } from "@shop/ui";
import { Control, Controller } from "react-hook-form";

import { CategoryAttribute } from "@/entities/category";
import { CreateProductInput } from "@/entities/product";

const REQUIRED_MESSAGE = "Значення обов'язкове";

interface SelectProductCategoryAttributeProps {
  attribute: CategoryAttribute;
  control: Control<CreateProductInput>;
}

const SelectProductCategoryAttribute = ({
  attribute,
  control,
}: SelectProductCategoryAttributeProps) => {
  const { key, label, type, unit, isRequired } = attribute;

  const fieldLabel = unit ? `${label} (${unit})` : label;
  const withRequired = isRequired ? `${fieldLabel} *` : fieldLabel;

  const rules = {
    validate: (value: unknown) => {
      if (!isRequired) return true;

      const isEmpty =
        value === undefined || value === null || (typeof value === "string" && value.trim() === "");

      return !isEmpty || REQUIRED_MESSAGE;
    },
  };

  if (type === "boolean") {
    return (
      <Controller
        name={`attributes.${key}`}
        control={control}
        render={({ field }) => (
          <div className="pt-1 sm:col-span-2">
            <CheckboxField
              id={`attr-${key}`}
              name={field.name}
              label={withRequired}
              checked={field.value === true}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </div>
        )}
      />
    );
  }

  return (
    <Controller
      name={`attributes.${key}`}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <InputField
          {...field}
          id={`attr-${key}`}
          type={type === "number" ? "number" : "text"}
          label={withRequired}
          placeholder={unit ? `Вкажіть у ${unit}` : undefined}
          value={
            typeof field.value === "string" || typeof field.value === "number" ? field.value : ""
          }
          onChange={(event) => {
            const nextValue = event.target.value;

            field.onChange(type === "number" && nextValue !== "" ? Number(nextValue) : nextValue);
          }}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

interface SelectProductCategoryAttributesFieldProps {
  attributes: CategoryAttribute[];
  control: Control<CreateProductInput>;
  isLoading?: boolean;
}

export const SelectProductCategoryAttributesField = ({
  attributes,
  control,
  isLoading,
}: SelectProductCategoryAttributesFieldProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl" />
        <Skeleton className="h-14 rounded-2xl sm:col-span-2" />
      </div>
    );
  }

  if (!attributes.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
      {attributes.map((attribute) => (
        <SelectProductCategoryAttribute
          key={attribute.key}
          attribute={attribute}
          control={control}
        />
      ))}
    </div>
  );
};
