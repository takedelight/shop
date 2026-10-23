CREATE TYPE "public"."user_role" AS ENUM('admin', 'customer', 'manager', 'guest');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role" DEFAULT 'customer' NOT NULL;