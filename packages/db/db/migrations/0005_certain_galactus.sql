ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "attributes" jsonb DEFAULT '[]'::jsonb NOT NULL;