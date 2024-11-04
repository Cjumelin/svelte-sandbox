CREATE TABLE IF NOT EXISTS "habit" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"start_at" timestamp DEFAULT now() NOT NULL,
	"deadline" date NOT NULL,
	"notifications" boolean DEFAULT true NOT NULL,
	"user_id" text NOT NULL
);

-- Add the constraint for "deadline" to be at least 5 days after "start_at"
ALTER TABLE "habit"
ADD CONSTRAINT "deadline_after_start_at"
CHECK ("deadline" >= "start_at" + INTERVAL '5 days');

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habit_response" (
	"id" text PRIMARY KEY NOT NULL,
	"answered_at" timestamp DEFAULT CURRENT_DATE NOT NULL,
	"habit_id" text NOT NULL,
	"response_date" date NOT NULL,
	"response_state" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"age" integer,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habit" ADD CONSTRAINT "habit_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habit_response" ADD CONSTRAINT "habit_response_habit_id_habit_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
