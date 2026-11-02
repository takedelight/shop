import { adminClient } from "better-auth/client/plugins";

import { ac, admin, customer, manager } from "./permissions";

/**
 * Better Auth client plugins shared by every app (web, mobile).
 *
 * Every app creates its own client with an app specific `baseURL` and its own
 * transport plugins (e.g. `expoClient` from `@better-auth/expo/client`):
 *
 * ```ts
 * createAuthClient({
 *   baseURL: "...",
 *   plugins: [...sharedAuthClientPlugins, appSpecificPlugin()],
 * });
 * ```
 */
export const sharedAuthClientPlugins = [
  adminClient({
    ac,
    roles: {
      admin,
      manager,
      customer,
    },
  }),
];
