import { Table, TableBody as TableBodyRoot, TableHeader as TableHeaderRoot } from "@shop/ui";
import { ComponentProps } from "react";

const CategoryTableRoot = ({ children, ...props }: ComponentProps<typeof Table>) => {
  return (
    <div className="mt-5 overflow-hidden rounded-md border">
      <Table {...props}>{children}</Table>
    </div>
  );
};

const TableHeader = ({ children, ...props }: ComponentProps<typeof TableHeaderRoot>) => {
  return <TableHeaderRoot {...props}>{children}</TableHeaderRoot>;
};

const TableBody = ({ children, ...props }: ComponentProps<typeof TableBodyRoot>) => {
  return <TableBodyRoot {...props}>{children}</TableBodyRoot>;
};

export const CategoryTable = Object.assign(CategoryTableRoot, { TableHeader, TableBody });
