import { RiAddLine } from "@remixicon/react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shop/ui";
import { ComponentProps } from "react";

import { CREATE_CATEGORY_ATTRIBUTE_FORM_ID } from "@/shared/const";

const CreateCategoryAttributeDialogRoot = ({
  children,
  ...props
}: ComponentProps<typeof Dialog>) => {
  return <Dialog {...props}>{children}</Dialog>;
};

const Trigger = ({ ...triggerProps }: ComponentProps<typeof DialogTrigger>) => {
  return (
    <DialogTrigger
      {...triggerProps}
      render={(props) => (
        <Button type="button" {...props}>
          <RiAddLine className="mr-1 size-4" /> Додати поле
        </Button>
      )}
    />
  );
};

const Content = ({ children, ...props }: ComponentProps<"form">) => {
  return (
    <DialogContent className="max-w-lg rounded-2xl p-6 sm:max-w-xl">
      <form id={CREATE_CATEGORY_ATTRIBUTE_FORM_ID} className="space-y-6" {...props}>
        {children}
      </form>
    </DialogContent>
  );
};

const Header = () => {
  return (
    <DialogHeader className="space-y-1">
      <DialogTitle className="text-xl ">Додати характеристику</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">
        Вкажіть параметри поля, яке буде додано до схеми товарів цієї категорії.
      </DialogDescription>
    </DialogHeader>
  );
};

const Footer = () => {
  return (
    <DialogFooter className="flex justify-end gap-3 pt-2">
      <DialogClose
        render={(props) => (
          <Button type="button" variant="outline" {...props}>
            Скасувати
          </Button>
        )}
      />

      <Button form={CREATE_CATEGORY_ATTRIBUTE_FORM_ID} type="submit">
        Додати
      </Button>
    </DialogFooter>
  );
};

export const CreateCategoryAttributeDialog = Object.assign(CreateCategoryAttributeDialogRoot, {
  Trigger,
  Content,
  Header,
  Footer,
});
