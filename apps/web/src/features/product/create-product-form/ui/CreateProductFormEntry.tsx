"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@shop/ui";

import { useCreateProductForm } from "../model/hooks/use-create-product-form";
import { CreateProductForm } from "./CreateProductForm";
import { CreateProductDescriptionField } from "./fields/CreateProductDescriptionField";
import { CreateProductNameField } from "./fields/CreateProductNameField";
import { CreateProductPriceField } from "./fields/CreateProductPriceField";
import { CreateProductSlugField } from "./fields/CreateProductSlugField";

export const CreateProductFormEntry = () => {
  const { form, handleNameChange, handleSlugChange } = useCreateProductForm();
  const { control } = form;

  return (
    <div className="space-y-8 lg:col-span-8">
      <CreateProductForm>
        <Accordion defaultValue={["product-general"]}>
          <AccordionItem value="product-general">
            <AccordionTrigger className="cursor-pointer py-2! hover:no-underline">
              <CreateProductForm.Header />
            </AccordionTrigger>

            <AccordionContent>
              <div className="space-y-4 pt-2">
                <CreateProductNameField control={control} onNameChange={handleNameChange} />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <CreateProductSlugField control={control} onSlugChange={handleSlugChange} />

                  <CreateProductPriceField control={control} />
                </div>

                <CreateProductDescriptionField control={control} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CreateProductForm>
    </div>
  );
};

// <section className="space-y-4">
//       <div>
//         <h2 className="text-lg font-semibold">Категорія та характеристики</h2>
//         <p className="text-xs text-muted-foreground">
//           Оберіть категорію для визначення схеми властивостей
//         </p>
//       </div>

//       <div className="space-y-4">
//         <SelectField
//           id="product-category"
//           name="categoryId"
//           label="Категорія"
//           placeholder="Оберіть категорію товару"
//           options={CATEGORY_OPTIONS}
//           defaultValue="laptops"
//         />

//         <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
//           <InputField
//             id="attr-ram"
//             name="attributes.ram_gb"
//             label="Оперативна пам'ять *"
//             placeholder="Вкажіть у ГБ"
//             type="number"
//           />

//           <InputField
//             id="attr-cpu"
//             name="attributes.cpu"11
//             label="Процесор *"
//             placeholder="напр. Intel Core i7"
//           />

//           <div className="pt-1 sm:col-span-2">
//             <CheckboxField
//               id="attr-ssd"
//               name="attributes.has_ssd"
//               label="Наявність швидкого накопичувача (SSD)"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
