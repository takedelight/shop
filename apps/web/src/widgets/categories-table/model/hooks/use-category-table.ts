"use client";

import { useTable } from "@tanstack/react-table";

import { Category } from "@/entities/category";

import { columns } from "../cfg/columns";
import { features } from "../cfg/table-features";

export const useCategoryTable = (categories: Category[]) => {
  const table = useTable({
    features,
    data: categories,
    columns,
  });

  return {
    table,
  };
};
