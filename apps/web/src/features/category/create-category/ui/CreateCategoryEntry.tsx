"use client";

import { RiAddLine } from "@remixicon/react";
import {
  Button,
  DialogClose,
  DialogTitle,
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
  Input,
} from "@shop/ui";
import { Controller } from "react-hook-form";

import { useCreateCategory } from "../model/hooks/use-create-category";
import { CreateCategoryDialog } from "./CreateCategoryDialog";

const FORM_ID = "create-category-form";

export const CreateCategoryEntry = () => {
  const { formState, control, handleSubmit, onSubmit, isOpen, setIsOpen } = useCreateCategory();

  return (
    <CreateCategoryDialog open={isOpen} onOpenChange={setIsOpen}>
      <CreateCategoryDialog.Trigger
        render={(props) => (
          <Button {...props}>
            <RiAddLine />
            Створити категорію
          </Button>
        )}
      />

      <CreateCategoryDialog.Content>
        <CreateCategoryDialog.Header>
          <DialogTitle>Створити категорію</DialogTitle>
        </CreateCategoryDialog.Header>

        <form id={FORM_ID} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FieldSet className="space-y-3">
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Назва категорії </FieldLabel>
                  <Input {...field} placeholder="Відеокарти" />
                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />

            <Controller
              control={control}
              name="slug"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Slug (URL) </FieldLabel>
                  <Input {...field} placeholder="videokarty" />
                  {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
                </Field>
              )}
            />
          </FieldSet>
        </form>

        <CreateCategoryDialog.Footer>
          <DialogClose
            render={(props) => (
              <Button {...props} variant="outline" type="button">
                Закрити
              </Button>
            )}
          />

          <Button type="submit" form={FORM_ID} disabled={formState.isSubmitting}>
            {formState.isSubmitting ? "Створення..." : "Створити"}
          </Button>
        </CreateCategoryDialog.Footer>
      </CreateCategoryDialog.Content>
    </CreateCategoryDialog>
  );
};
