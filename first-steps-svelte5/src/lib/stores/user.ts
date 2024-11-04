import type { User } from '$lib/server/db/schema';
import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type ShowableUser = Omit<User, 'passwordHash' | 'age'>; 
export const user: Writable<ShowableUser| null> = writable(null);