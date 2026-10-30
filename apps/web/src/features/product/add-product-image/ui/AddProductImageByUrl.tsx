"use client";

import { RiImageAddLine } from "@remixicon/react";
import { Button, InputField } from "@shop/ui";

import { useAddProductImage } from "../model/hooks/use-add-product-image";

export const AddProductImageByUrl = () => {
  const { url, urlError, setUrl, addImageByUrl } = useAddProductImage();

  return (
    <div className="flex items-start gap-2 py-5">
      <div className="flex-1">
        <InputField
          id="product-image-url"
          label="Посилання на зображення"
          placeholder="https://example.com/photo.jpg"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addImageByUrl();
            }
          }}
          error={urlError ?? undefined}
        />
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="rounded-2xl"
        onClick={addImageByUrl}
      >
        <RiImageAddLine className="size-5" />
      </Button>
    </div>
  );
};
