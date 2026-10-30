import { PropsWithChildren } from "react";

const AddProductImageRoot = ({ children }: PropsWithChildren) => {
  return <div className="py-2">{children}</div>;
};

const Header = () => {
  return (
    <header>
      <h2 className="text-lg font-semibold">Зображення товару</h2>
      <p className="text-xs text-muted-foreground">
        Додайте URL або завантажте фотографії для галереї
      </p>
    </header>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const Footer = ({ children }: PropsWithChildren) => {
  return <footer className="space-y-2 pt-1">{children}</footer>;
};
export const AddProductImage = Object.assign(AddProductImageRoot, { Header, Content, Footer });
