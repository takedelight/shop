"use client";

import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { ac, admin, customer, manager } from "./permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        manager,
        customer,
      },
    }),
  ],
});
