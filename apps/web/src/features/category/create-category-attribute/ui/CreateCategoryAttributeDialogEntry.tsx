import { RiAddLine } from "@remixicon/react";
import {
  Button,
  CheckboxField,
  ComboboxField,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  InputField,
  SelectField,
} from "@shop/ui";
import { ComponentProps, useState } from "react";

import { COMMON_UNITS, TYPE_OPTIONS } from "../model/const/options";

export interface AttributeFormData {
  key: string;
  label: string;
  type: string;
  unit?: string;
  isRequired: boolean;
}

export const CreateAttributeDialogEntry = ({ ...triggerProps }: ComponentProps<typeof Button>) => {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<string>("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        {...triggerProps}
        render={(props) => (
          <Button type="button" {...props}>
            <RiAddLine className="mr-1 size-4" /> Додати поле
          </Button>
        )}
      />

      <DialogContent className="max-w-lg rounded-2xl p-6 sm:max-w-xl">
        <form className="space-y-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl font-semibold">Додати характеристику</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Вкажіть параметри поля, яке буде додано до схеми товарів цієї категорії.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField id="attr-key" name="key" label="JSON Key" placeholder="ram_gb" required />
              <InputField
                id="attr-label"
                name="label"
                label="Назва"
                placeholder="Оперативна пам'ять"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SelectField
                name="type"
                label="Тип даних"
                options={TYPE_OPTIONS}
                defaultValue="string"
              />

              <ComboboxField
                id="attr-unit"
                label="Од. виміру"
                placeholder="Оберіть або введіть"
                emptyText="Одиницю не знайдено"
                options={COMMON_UNITS}
                value={unit}
                onValueChange={(val) => setUnit(val ?? "")}
              />
            </div>

            <div className="pt-1">
              <CheckboxField id="attr-required" name="isRequired" label="Обов'язкове поле" />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-3 pt-2">
            <DialogClose>
              <Button type="button" variant="outline">
                Скасувати
              </Button>
            </DialogClose>
            <Button type="submit">Додати</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
