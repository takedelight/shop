import { RiShoppingBag3Line } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage, Input } from "@shop/ui";
import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/core/auth/auth";

import { HEADER_ACTION_LINKS } from "../model/const/header";
import { Header } from "./Header";

export const HeaderEntry = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Header>
      <Header.LeftSide>
        <Link className="flex items-center gap-1" href="/">
          <RiShoppingBag3Line className="size-8" />
          <span className="font-sans text-xl font-semibold">Shop</span>
        </Link>
      </Header.LeftSide>

      <Header.CenterSide>
        <Input className="w-full border-neutral-500" placeholder="Search.." />
      </Header.CenterSide>

      <Header.RightSide>
        <ul className="flex items-center gap-4">
          {HEADER_ACTION_LINKS.map((link) => (
            <li key={link.href}>
              <Link className="flex items-center gap-1" href={link.href}>
                <link.icon className="size-5" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}

          <li>
            <Avatar>
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              {session?.user?.image && (
                <AvatarImage src={session.user.image} alt={session.user.name ?? "Avatar"} />
              )}
            </Avatar>
          </li>
        </ul>
      </Header.RightSide>
    </Header>
  );
};
