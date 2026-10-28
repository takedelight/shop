import { Button } from "@shop/ui";
import Link from "next/link";

import { CREATE_CATEGORY_FORM_ID } from "@/shared/const";
import { CategoryAttributesListEntry } from "@/widgets/category-attributes-list";
import { CreateCategoryEntry, CreateCategoryFormProvider } from "@/widgets/create-category";

export default function CreateCategoryPage() {
  return (
    <CreateCategoryFormProvider>
      <div className="w-full  ">
        <CreateCategoryEntry />

        <CategoryAttributesListEntry />

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" type="button">
            <Link href="/admin/categories">Скасувати</Link>
          </Button>
          <Button form={CREATE_CATEGORY_FORM_ID} type="submit">
            Створити категорію
          </Button>
        </div>
      </div>
    </CreateCategoryFormProvider>
  );
}
