import * as React from "react";
import { useFormContext } from "react-hook-form";

import { slugify } from "@/shared/lib/slugify";

export const useProductSlugSync = () => {
  const { setValue, getFieldState } = useFormContext();

  const handleNameChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
      const nextName = e.target.value;
      fieldChange(nextName);

      const { isDirty: isSlugDirty } = getFieldState("slug");
      if (!isSlugDirty) {
        setValue("slug", slugify(nextName), {
          shouldValidate: true,
          shouldDirty: false,
        });
      }
    },
    [getFieldState, setValue],
  );

  const handleSlugChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
      fieldChange(slugify(e.target.value));
    },
    [],
  );

  return {
    handleNameChange,
    handleSlugChange,
  };
};
