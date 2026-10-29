"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@shop/ui";

import { Category } from "@/entities/category";

import { useSelectProductCategory } from "../model/hooks/use-select-product-category";
import { SelectProductCategoryAttributesField } from "./fields/SelectProductCategoryAttributesField";
import { SelectProductCategoryField } from "./fields/SelectProductCategoryField";
import { SelectProductCategory } from "./SelectProductCategory";

interface SelectProductCategoryEntryProps {
  categories: Category[];
}

export const SelectProductCategoryEntry = ({ categories }: SelectProductCategoryEntryProps) => {
  const { form, options, onCategoryChange, attributes, isLoading } =
    useSelectProductCategory(categories);
  const { control } = form;

  return (
    <SelectProductCategory>
      <Accordion defaultValue={["product-category"]}>
        <AccordionItem value="product-category">
          <AccordionTrigger className="cursor-pointer py-2! hover:no-underline">
            <SelectProductCategory.Header />
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-4 pt-2">
              <SelectProductCategoryField
                control={control}
                options={options}
                onCategoryChange={onCategoryChange}
              />

              <SelectProductCategoryAttributesField
                control={control}
                attributes={attributes}
                isLoading={isLoading}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SelectProductCategory>
  );
};
