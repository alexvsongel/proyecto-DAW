ALTER TABLE "documents" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "suggestions" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "suggestions" ADD CONSTRAINT "suggestions_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "suggestions" DROP COLUMN "user_id";