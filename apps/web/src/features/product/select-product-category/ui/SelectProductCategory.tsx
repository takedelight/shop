import { PropsWithChildren } from "react";

const SelectProductCategoryRoot = ({ children }: PropsWithChildren) => {
  return <div className="space-y-4">{children}</div>;
};

const Header = () => {
  return (
    <header>
      <h2 className="text-lg font-semibold">Категорія та характеристики</h2>
      <p className="text-xs text-muted-foreground">
        Оберіть категорію для визначення схеми властивостей
      </p>
    </header>
  );
};

export const SelectProductCategory = Object.assign(SelectProductCategoryRoot, { Header });
