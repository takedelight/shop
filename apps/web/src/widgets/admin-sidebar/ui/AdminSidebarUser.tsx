"use client";

import { RiLogoutBoxLine } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@shop/ui";

import { useSignOut } from "../model/hooks/useSignOut";

type AdminSidebarUserProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export const AdminSidebarUser = ({ user }: AdminSidebarUserProps) => {
  const { handleSignOut } = useSignOut();

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        {user.image && <AvatarImage src={user.image} alt={user.name ?? "Avatar"} />}
      </Avatar>

      <div className="grid flex-1 truncate">
        <span className="truncate text-sm font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
      </div>

      <Button variant="ghost" size="icon-sm" aria-label="Вийти" onClick={handleSignOut}>
        <RiLogoutBoxLine />
      </Button>
    </div>
  );
};
