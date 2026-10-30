"use client";

import { RiDeleteBinLine } from "@remixicon/react";
import { Button } from "@shop/ui";

import { useAddProductImage } from "../model/hooks/use-add-product-image";
import { AddProductImage } from "./AddProductImage";
import { AddProductImageByUrl } from "./AddProductImageByUrl";
import { AddProductImageDropzone } from "./AddProductImageDropzone";

export const AddProductImageEntry = () => {
  const { images, removeImage, setMainImage } = useAddProductImage();

  return (
    <AddProductImage>
      <AddProductImage.Header />

      <AddProductImage.Content>
        <AddProductImageByUrl />

        <AddProductImageDropzone />
      </AddProductImage.Content>

      <AddProductImage.Footer>
        <span className="text-xs font-medium text-muted-foreground">
          Завантажені зображення ({images.length})
        </span>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={image}
              className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted"
            >
              {/* Зображення за довільним URL — next/image потребує white-list хостів у конфігу */}
              {/* oxlint-disable-next-line next/no-img-element */}
              <img
                src={image}
                alt={`Зображення товару ${index + 1}`}
                className="size-full object-cover"
              />

              {index === 0 ? (
                <span className="absolute bottom-1.5 left-1.5 rounded-sm bg-background/90 px-1 py-0.5 text-xs font-medium">
                  Головне
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setMainImage(index)}
                  className="absolute bottom-1.5 left-1.5 rounded-sm bg-background/90 px-1 py-0.5 text-xs font-medium opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100"
                >
                  Зробити головним
                </button>
              )}

              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                onClick={() => removeImage(index)}
                className="absolute top-1.5 right-1.5 opacity-0 backdrop-blur-xs transition-opacity group-hover:opacity-100"
              >
                <RiDeleteBinLine className="size-3.5" />
              </Button>
            </div>
          ))}
        </div>
      </AddProductImage.Footer>
    </AddProductImage>
  );
};
