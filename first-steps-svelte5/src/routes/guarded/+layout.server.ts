import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { ShowableUser } from '$lib/stores/user';
import type { RequestEvent } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const load = async (event: RequestEvent): Promise<{ user: ShowableUser }> => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	}

	return { user: event.locals.user };
};
