import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { Button, InputField, SelectField } from "@shop/ui";
import Link from "next/link";

const typeOptions = [
  { label: "Рядок (Текст)", value: "string" },
  { label: "Число", value: "number" },
  { label: "Так / Ні", value: "boolean" },
];

export const CreateCategoryFormEntry = () => {
  return (
    <div className="w-full py-6">
      <form className="space-y-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField id="category-name" label="Назва категорії" placeholder="напр. Смартфони" />

            <InputField id="category-slug" label="Slug (URL)" placeholder="smartphones" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h2 className="text-lg font-semibold">Схема характеристик</h2>
              <p className="text-sm text-muted-foreground">
                Поля, які заповнюватимуться при створенні товару в цій категорії.
              </p>
            </div>
            <Button type="button" variant="outline" size="sm">
              <RiAddLine className="mr-1 size-4" /> Додати поле
            </Button>
          </div>

          <div className="divide-y">
            <div className="space-y-3 py-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <InputField id="attr-key-demo" label="JSON Key" placeholder="ram_gb" />

                <InputField
                  id="attr-label-demo"
                  label="Назва (Label)"
                  placeholder="Оперативна пам'ять"
                />

                <InputField id="attr-unit-demo" label="Од. виміру" placeholder="ГБ / см" />
              </div>

              {/* Нижній ряд: селект, чекбокс та кнопка видалення притиснута праворуч */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-3">
                  <SelectField
                    label="Тип"
                    options={typeOptions}
                    defaultValue="string"
                    className="sm:w-52"
                  />

                  {/* Обов'язкове */}
                  <label
                    htmlFor="req-demo"
                    className="flex h-14 cursor-pointer items-center gap-2.5 rounded-xl bg-input px-4 transition-colors select-none focus-within:ring-2 focus-within:ring-primary hover:bg-input/80"
                  >
                    <input
                      type="checkbox"
                      id="req-demo"
                      className="size-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Обов&apos;язкове</span>
                  </label>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="size-10 text-destructive hover:text-destructive"
                >
                  <RiDeleteBinLine className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" type="button">
            <Link href="/admin/categories">Скасувати</Link>
          </Button>
          <Button type="submit">Створити категорію</Button>
        </div>
      </form>
    </div>
  );
};
