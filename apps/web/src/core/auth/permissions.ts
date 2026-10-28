import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  user: ["create", "read", "update", "delete", "ban", "set-role"],

  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],

  order: ["read", "update-status", "cancel", "refund"],

  coupon: ["create", "read", "update", "delete"],

  review: ["read", "create", "update", "delete", "moderate"],

  analytics: ["read"],
  settings: ["read", "update"],
} as const;

export const ac = createAccessControl(statement);

export const customer = ac.newRole({
  product: ["read"],
  review: ["read", "create", "update", "delete"],
});

export const manager = ac.newRole({
  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  order: ["read", "update-status", "cancel", "refund"],
  coupon: ["create", "read", "update", "delete"],
  review: ["read", "moderate"],
  analytics: ["read"],
  settings: ["read", "update"],
});

export const admin = ac.newRole({
  user: ["create", "read", "update", "delete", "ban", "set-role"],
  product: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  order: ["read", "update-status", "cancel", "refund"],
  coupon: ["create", "read", "update", "delete"],
  review: ["read", "create", "update", "delete", "moderate"],
  analytics: ["read"],
  settings: ["read", "update"],
});
