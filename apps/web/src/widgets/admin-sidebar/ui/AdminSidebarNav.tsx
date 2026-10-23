"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shop/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_SIDEBAR_NAV_ITEMS } from "../model/const/admin-sidebar";

export const AdminSidebarNav = () => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Меню</SidebarGroupLabel>
      <SidebarMenu>
        {ADMIN_SIDEBAR_NAV_ITEMS.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              render={<Link href={item.href} />}
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
