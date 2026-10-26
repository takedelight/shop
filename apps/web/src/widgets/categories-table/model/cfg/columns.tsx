import { createColumnHelper } from "@tanstack/react-table";

import { Category } from "@/entities/category";

import { DeleteCategoryButton } from "../../ui/DeleteCategoryButton";
import { DataTableFeatures } from "./table-features";

const columnHelper = createColumnHelper<DataTableFeatures, Category>();

export const columns = columnHelper.columns([
  columnHelper.accessor("name", {
    header: "Назва",
  }),
  columnHelper.accessor("slug", {
    header: "Префікс",
  }),
  columnHelper.accessor("createdAt", {
    header: "Дата створення",
    cell: (info) => info.getValue().toLocaleDateString("uk-UA", { dateStyle: "short" }),
  }),

  columnHelper.display({
    id: "actions",
    header: () => <span className="sr-only">Дії</span>,
    cell: (info) => {
      const category = info.row.original;

      return (
        <div className="flex items-end justify-end gap-2">
          <DeleteCategoryButton categoryId={category.id} />
        </div>
      );
    },
  }),
]);
