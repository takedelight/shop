"use client";

import { RiDeleteBinLine } from "@remixicon/react";
import { Button } from "@shop/ui";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteCategoryAction } from "../api/delete-category.action";

interface DeleteCategoryButtonProps {
  categoryId: string;
}

export const DeleteCategoryButton = ({ categoryId }: DeleteCategoryButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCategoryAction(categoryId);

      if (!res.success) {
        alert(res.error ?? "Помилка при видаленні");
        return;
      }

      router.refresh();
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
      className="text-destructive hover:text-destructive"
    >
      <RiDeleteBinLine className="size-4" />
    </Button>
  );
};
