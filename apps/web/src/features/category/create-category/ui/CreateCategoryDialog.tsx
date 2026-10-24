import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@shop/ui";
import { ComponentProps } from "react";

const CreateCategoryDialogRoot = ({ children, ...props }: ComponentProps<typeof Dialog>) => {
  return <Dialog {...props}>{children}</Dialog>;
};

const Trigger = ({ children, ...props }: ComponentProps<typeof DialogTrigger>) => {
  return <DialogTrigger {...props}>{children}</DialogTrigger>;
};

const Header = ({ children, ...props }: ComponentProps<typeof DialogHeader>) => {
  return <DialogHeader {...props}>{children}</DialogHeader>;
};

const Content = ({ children, ...props }: ComponentProps<typeof DialogContent>) => {
  return <DialogContent {...props}>{children}</DialogContent>;
};

const Footer = ({ children, ...props }: ComponentProps<typeof DialogFooter>) => {
  return <DialogFooter {...props}>{children}</DialogFooter>;
};

export const CreateCategoryDialog = Object.assign(CreateCategoryDialogRoot, {
  Content,
  Footer,
  Header,
  Trigger,
});
