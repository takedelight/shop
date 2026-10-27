import { CreateCategoryFormEntry } from "@/features/category/create-category";
import { CreateAttributeDialogEntry } from "@/features/category/create-category-attribute";

export const CreateCategoryEntry = () => {
  return (
    <>
      <CreateCategoryFormEntry />

      <div className="flex items-center justify-between border-b pb-2">
        <div>
          <h2 className="text-lg font-semibold">Схема характеристик</h2>
          <p className="text-sm text-muted-foreground">
            Поля, які заповнюватимуться при створенні товару в цій категорії.
          </p>
        </div>

        <CreateAttributeDialogEntry size="md" variant="outline" />
      </div>
    </>
  );
};
