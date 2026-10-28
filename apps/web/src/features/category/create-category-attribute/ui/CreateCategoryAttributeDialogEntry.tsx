"use client";

import { Button } from "@shop/ui";
import { ComponentProps } from "react";

import { useCreateCategoryAttributes } from "../model/hooks/use-create-category-atrributes";
import { CreateCategoryAttributeDialog } from "./CreateCategoryAttributeDialog";
import { CreateCategoryAttributeDialogCheckbox } from "./CreateCategoryAttributeDialogCheckbox";
import { CreateCategoryAttributeDialogComboboxs } from "./CreateCategoryAttributeDialogComboboxs";
import { CreateCategoryAttributeDialogInputs } from "./CreateCategoryAttributeDialogInputs";

export const CreateAttributeDialogEntry = ({ ...triggerProps }: ComponentProps<typeof Button>) => {
  const { isOpen, setIsOpen, handleSubmit, control } = useCreateCategoryAttributes();

  return (
    <CreateCategoryAttributeDialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateCategoryAttributeDialog.Trigger {...triggerProps} />

      <CreateCategoryAttributeDialog.Content onSubmit={handleSubmit}>
        <CreateCategoryAttributeDialog.Header />

        <div className="space-y-4">
          <CreateCategoryAttributeDialogInputs control={control} />

          <CreateCategoryAttributeDialogComboboxs control={control} />

          <CreateCategoryAttributeDialogCheckbox control={control} />
        </div>

        <CreateCategoryAttributeDialog.Footer />
      </CreateCategoryAttributeDialog.Content>
    </CreateCategoryAttributeDialog>
  );
};
