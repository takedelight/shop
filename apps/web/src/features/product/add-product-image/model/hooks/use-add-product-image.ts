"use client";

import { toast } from "@shop/ui";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { CreateProductInput } from "@/entities/product";

import { getProductImageUploadUrlAction } from "../../api/get-product-image-upload-url.action";

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export const useAddProductImage = () => {
  const form = useFormContext<CreateProductInput>();

  const images = useWatch({ control: form.control, name: "imageUrl" }) ?? [];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const setImages = (nextImages: string[]) => {
    form.setValue("imageUrl", nextImages, { shouldValidate: true });
  };

  const addImage = (imageUrl: string) => {
    const current = form.getValues("imageUrl") ?? [];

    if (current.includes(imageUrl)) {
      toast.add({
        type: "error",
        title: "Помилка",
        description: "Таке зображення вже додано",
      });

      return;
    }

    setImages([...current, imageUrl]);
  };

  const addImageByUrl = () => {
    const value = url.trim();

    if (!value) {
      setUrlError("Введіть посилання на зображення");
      return;
    }

    if (!isValidUrl(value)) {
      setUrlError("Некоректна URL-адреса зображення");
      return;
    }

    addImage(value);

    setUrl("");
    setUrlError(null);
  };

  const removeImage = (index: number) => {
    const current = form.getValues("imageUrl") ?? [];

    setImages(current.filter((_, i) => i !== index));
  };

  const setMainImage = (index: number) => {
    const current = form.getValues("imageUrl") ?? [];

    if (index === 0 || !current[index]) return;

    const nextImages = [...current];
    const [mainImage] = nextImages.splice(index, 1);

    nextImages.unshift(mainImage);

    setImages(nextImages);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFilesChange = async (files: FileList | null) => {
    if (!files?.length || isUploading) return;

    setIsUploading(true);

    // Послідовне завантаження, щоб зберегти порядок зображень
    for (const file of Array.from(files)) {
      try {
        // oxlint-disable-next-line no-await-in-loop
        const result = await getProductImageUploadUrlAction({
          name: file.name,
          type: file.type,
          size: file.size,
        });

        if (!result.success || !result.data) {
          toast.add({
            type: "error",
            title: "Помилка",
            description: result.error ?? "Не вдалося завантажити зображення",
          });

          continue;
        }

        // oxlint-disable-next-line no-await-in-loop
        const response = await fetch(result.data.url, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!response.ok) {
          toast.add({
            type: "error",
            title: "Помилка",
            description: "Не вдалося завантажити зображення",
          });

          continue;
        }

        addImage(result.data.imageUrl);
      } catch {
        toast.add({
          type: "error",
          title: "Помилка",
          description: "Не вдалося завантажити зображення",
        });
      }
    }

    setIsUploading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    images,
    url,
    urlError,
    isUploading,
    fileInputRef,
    setUrl,
    addImageByUrl,
    removeImage,
    setMainImage,
    handleFileClick,
    handleFilesChange,
  };
};
