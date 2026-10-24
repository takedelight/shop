import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { account } from "./schemas/account";
import { category } from "./schemas/category";
import { session } from "./schemas/session";
import { user } from "./schemas/user";
import { verification } from "./schemas/verification";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});
export const db = drizzle(pool, {
  schema: {
    user,
    account,
    session,
    verification,
    category,
  },
});
