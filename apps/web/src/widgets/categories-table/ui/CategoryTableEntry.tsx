"use client";

import { TableCell, TableHead, TableRow } from "@shop/ui";

import { Category } from "@/entities/category";

import { columns } from "../model/cfg/columns";
import { useCategoryTable } from "../model/hooks/use-category-table";
import { CategoryTable } from "./CategoryTable";

interface CategoryTableEntryProps {
  categories: Category[];
}

export const CategoryTableEntry = ({ categories }: CategoryTableEntryProps) => {
  const { table } = useCategoryTable(categories);

  return (
    <CategoryTable>
      <CategoryTable.TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </CategoryTable.TableHeader>

      <CategoryTable.TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </CategoryTable.TableBody>
    </CategoryTable>
  );
};
