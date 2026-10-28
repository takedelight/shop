import "server-only";
import { createDb } from "@shop/db";

export const db = createDb(process.env.DATABASE_URL!);
