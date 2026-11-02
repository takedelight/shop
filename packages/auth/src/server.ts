import { expo } from "@better-auth/expo";
import { createDb } from "@shop/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import "server-only";
import { admin as adminPlugin } from "better-auth/plugins";

import { ac, admin, customer, manager } from "./permissions";

/** Reads a required variable from the environment, failing fast when it's missing. */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`[shop/auth] ${name} is missing. Add it to the root .env file.`);
  }
  return value;
}

const db = createDb(requireEnv("DATABASE_URL"));

/**
 * Deep link origins of the native clients (Expo app scheme from `app.json`).
 *
 * The `@better-auth/expo` server plugin rewrites the request `origin` from the
 * `expo-origin` header, and native clients send the session cookie explicitly,
 * so Better Auth validates these origins against this list.
 *
 * Additional origins (e.g. `http://localhost:8081` for Expo Web in development)
 * can be added through the built-in `BETTER_AUTH_TRUSTED_ORIGINS` env variable
 * (comma separated).
 */
const NATIVE_TRUSTED_ORIGINS = ["mobile://"];

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      // An empty value is reported by Better Auth as a missing provider config.
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  trustedOrigins: NATIVE_TRUSTED_ORIGINS,
  plugins: [
    adminPlugin({
      ac,
      roles: {
        admin,
        manager,
        customer,
      },
    }),
    expo(),
  ],
});
