import { eq } from "drizzle-orm";
import { db } from ".";
import { habit } from "./schema";

export const gethabitByuserId = async (userId: string) => {
    return await db
    .select().from(habit)
    .where(eq(habit.userId, userId))
}