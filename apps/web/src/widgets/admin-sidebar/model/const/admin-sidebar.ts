import {
  RiDashboard3Line,
  RiFileList3Line,
  RiFolderLine,
  RiSettings3Line,
  RiShoppingBag3Line,
  RiTeamLine,
} from "@remixicon/react";

export const ADMIN_SIDEBAR_NAV_ITEMS = [
  {
    label: "Огляд",
    href: "/admin",
    icon: RiDashboard3Line,
  },
  {
    label: "Товари",
    href: "/admin/products",
    icon: RiShoppingBag3Line,
  },
  {
    label: "Категорії",
    href: "/admin/categories",
    icon: RiFolderLine,
  },
  {
    label: "Замовлення",
    href: "/admin/orders",
    icon: RiFileList3Line,
  },
  {
    label: "Клієнти",
    href: "/admin/customers",
    icon: RiTeamLine,
  },
  {
    label: "Налаштування",
    href: "/admin/settings",
    icon: RiSettings3Line,
  },
];
