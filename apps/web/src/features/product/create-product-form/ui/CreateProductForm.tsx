import { PropsWithChildren } from "react";

const CreateProductFormRoot = ({ children }: PropsWithChildren) => {
  return <div className="space-y-4">{children}</div>;
};

const Header = () => {
  return (
    <header>
      <h2 className="text-lg font-semibold">Основна інформація</h2>
      <p className="text-xs text-muted-foreground">Базові параметри для ідентифікації товару</p>
    </header>
  );
};

export const CreateProductForm = Object.assign(CreateProductFormRoot, { Header });
