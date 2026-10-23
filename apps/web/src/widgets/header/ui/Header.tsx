import { PropsWithChildren } from "react";

const HeaderRoot = ({ children }: PropsWithChildren) => {
  return (
    <header className=" border-b py-2">
      <nav className="container mx-auto flex justify-between px-2">{children}</nav>
    </header>
  );
};

const LeftSide = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

const CenterSide = ({ children }: PropsWithChildren) => {
  return <div className="w-100">{children}</div>;
};

export const RightSide = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export const Header = Object.assign(HeaderRoot, { LeftSide, RightSide, CenterSide });
