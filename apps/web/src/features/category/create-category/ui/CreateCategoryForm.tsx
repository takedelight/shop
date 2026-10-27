import { ComponentProps, PropsWithChildren } from "react";

import { CREATE_CATEGORY_FORM_ID } from "@/shared/const";

const CreateCategoryRoot = ({ children, onSubmit }: ComponentProps<"form">) => {
  return (
    <div className="w-full py-6">
      <form id={CREATE_CATEGORY_FORM_ID} onSubmit={onSubmit} className="space-y-8">
        {children}
      </form>
    </div>
  );
};

const Header = ({ children }: PropsWithChildren) => {
  return <header className="space-y-4">{children}</header>;
};

const Content = ({ children }: PropsWithChildren) => {
  return <div className="space-y-4">{children}</div>;
};

const Footer = ({ children }: PropsWithChildren) => {
  return <footer className="flex justify-end gap-3 border-t pt-4">{children}</footer>;
};

export const CreateCategoryForm = Object.assign(CreateCategoryRoot, { Header, Content, Footer });
