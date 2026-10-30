"use client";

import { RiCheckLine } from "@remixicon/react";
import { Button, ScrollArea } from "@shop/ui";

import { Category } from "@/entities/category";
import { AddProductImageEntry } from "@/features/product/add-product-image";
import { CreateProductFormEntry } from "@/features/product/create-product-form";
import { SelectProductCategoryEntry } from "@/features/product/select-product-category";

import { useCreateProduct } from "../model/hooks/use-create-product";

interface CreateProductEntryProps {
  categories: Category[];
}

export const CreateProductEntry = ({ categories }: CreateProductEntryProps) => {
  const { form, onSubmit } = useCreateProduct();

  const { handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full space-y-10 pb-24 lg:flex lg:h-[calc(100svh-6rem)] lg:min-h-0 lg:flex-col lg:pb-0">
        <div className="grid grid-cols-1 items-start gap-12 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)]">
          {/* ЛІВА ЧАСТИНА: Робота з медіафайлами */}
          <div className="space-y-5 lg:col-span-4">
            <AddProductImageEntry />
          </div>

          {/* ПРАВА ЧАСТИНА: Основна інформація, категорія та характеристики */}
          <ScrollArea className="lg:col-span-8 lg:h-full">
            <div className="space-y-10">
              <CreateProductFormEntry />

              <SelectProductCategoryEntry categories={categories} />
            </div>
          </ScrollArea>
        </div>

        <hr className="border-border" />

        {/* Кнопки дій */}
        <div className="flex flex-col-reverse items-center justify-end gap-3 sm:flex-row">
          <Button type="button" size="default" variant="ghost" className="w-full sm:w-auto">
            Скасувати
          </Button>
          <Button type="submit" size="default" className="w-full sm:w-auto">
            <RiCheckLine className="mr-2 size-5" />
            Зберегти товар
          </Button>
        </div>
      </div>
    </form>
  );
};
