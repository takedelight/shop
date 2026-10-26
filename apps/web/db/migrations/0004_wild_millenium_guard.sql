CREATE TABLE "product" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"image_url" text[] DEFAULT '{}' NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"stock" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "product_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_parent_id_category_id_fk";
--> statement-breakpoint
DROP INDEX "category_parentId_sortOrder_idx";--> statement-breakpoint
ALTER TABLE "category" ALTER COLUMN "slug" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "image";--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "parent_id";--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "sort_order";