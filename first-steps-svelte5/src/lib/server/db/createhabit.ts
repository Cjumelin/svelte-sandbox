import { nanoid } from 'nanoid';
import { db } from '.'; 
import { habit, type Habit } from './schema';

type HabitInput = Omit<typeof habit.$inferInsert, 'id' | 'userId'>;

export async function createHabit(habitData: HabitInput, userId: string): Promise<void> {
  await db.insert(habit).values({
    id: nanoid(), 
    title: habitData.title,
    description: habitData.description,
    deadline: habitData.deadline,
    notifications: habitData.notifications,
    userId: userId,
  });
}