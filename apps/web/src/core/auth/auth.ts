import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin as adminPlugin } from "better-auth/plugins";
import "server-only";

import { db } from "../db";
import { ac, admin, customer, manager } from "./permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        manager,
        customer,
      },
    }),
  ],
});
