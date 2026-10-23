import { RiShoppingBag3Fill } from "@remixicon/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@shop/ui";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/shared/auth/auth";

import { AdminSidebarNav } from "./AdminSidebarNav";
import { AdminSidebarUser } from "./AdminSidebarUser";

export const AdminSidebarEntry = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="До магазину" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <RiShoppingBag3Fill className="size-4" />
              </div>
              <div className="grid flex-1 leading-tight">
                <span className="truncate font-semibold">Shop</span>
                <span className="truncate text-xs">Адмін</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <AdminSidebarNav />
      </SidebarContent>

      <SidebarFooter>
        {session?.user && (
          <AdminSidebarUser
            user={{
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }}
          />
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
