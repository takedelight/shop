import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Категорії",
};

const CategoriesPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Категорії</h1>
      <p className="text-muted-foreground">Тут буде створення та управління категоріями.</p>
    </div>
  );
};

export default CategoriesPage;
