import { pgTable, date, check, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});


export const habit = pgTable('habit', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	startAt: timestamp('start_at', {mode: "string", withTimezone: true}).notNull().defaultNow(),
	deadline: date('deadline', { mode: "string"} ).notNull(),
	notifications: boolean('notifications').default(true).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
},
);

export const habitResponse = pgTable('habit_response', {
	id: text('id').primaryKey(),
	answeredAt: timestamp("answered_at", {withTimezone: true}).notNull().default(sql`CURRENT_DATE`),
	habitId: text('habit_id')
		.notNull()
		.references(() => habit.id),
	responseDate: date('response_date').notNull(),
	// TODO: Create enum or ...
	responseState: text('response_state').notNull() // "Positive", "Negative", "No Response"
});

export type Habit = typeof habit.$inferSelect;
export type HabitResponse = typeof habitResponse.$inferSelect;
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
