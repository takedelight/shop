"use client";

import { RiUploadCloud2Line } from "@remixicon/react";

import { useAddProductImage } from "../model/hooks/use-add-product-image";

export const AddProductImageDropzone = () => {
  const { fileInputRef, isUploading, handleFileClick, handleFilesChange } = useAddProductImage();

  return (
    <>
      <div
        onClick={handleFileClick}
        className="flex h-60 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 p-8 text-center transition-colors hover:border-neutral-400 hover:bg-neutral-100"
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <RiUploadCloud2Line className="size-6 text-muted-foreground" />
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">
            {isUploading ? "Завантаження..." : "Натисніть для вибору"}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">PNG, JPG або WEBP до 5MB</span>
      </div>

      <input
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        ref={fileInputRef}
        onChange={(event) => handleFilesChange(event.target.files)}
      />
    </>
  );
};
