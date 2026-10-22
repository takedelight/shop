import { FieldGroup } from "@shop/ui";
import { PropsWithChildren } from "react";

const RegisterRoot = ({ children }: PropsWithChildren) => {
  return (
    <form className="flex flex-col gap-6">
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  return <header className="flex flex-col items-center gap-1 text-center">{children}</header>;
};

const Content = ({ children }: PropsWithChildren) => {
  return children;
};

const Footer = ({ children }: PropsWithChildren) => {
  return <footer>{children}</footer>;
};

export const Register = Object.assign(RegisterRoot, { Header, Content, Footer });
