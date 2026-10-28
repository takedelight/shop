import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { account } from "./schemas/account";
import { category } from "./schemas/category";
import { product } from "./schemas/product";
import { session } from "./schemas/session";
import { user } from "./schemas/user";
import { verification } from "./schemas/verification";

export const schema = {
  user,
  account,
  session,
  verification,
  category,
  product,
};

export const createDb = (connectionString: string) => {
  const pool = new Pool({ connectionString });

  return drizzle(pool, { schema });
};

export type Database = ReturnType<typeof createDb>;
