import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/core/auth/auth";
import "server-only";

const ADMIN_ROLES = new Set(["admin", "manager"]);

export async function requireAdminAccess() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (!session.user.role || !ADMIN_ROLES.has(session.user.role)) {
    notFound();
  }

  return session;
}
