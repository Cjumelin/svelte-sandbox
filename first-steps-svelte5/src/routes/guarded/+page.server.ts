import { createHabit } from '$lib/server/db/createhabit';
import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const actions: Actions = {
	createHabit: async (all) => {
		// Ensure the user is logged in
		const { request, locals } = all;
		const user = locals.user;
		if (!user) {
			throw new Error('User not authenticated');
		}

		// Extract form data
		const formData = await request.formData();
		const habitData = {
			title: formData.get('title') as string,
			description: formData.get('description') as string,
			deadline: formData.get('deadline') as string,
			// Checkbox values return 'on' when checked
			notifications: formData.get('notifications') === 'on'
		};

		// Call the server-side createHabit function
		try {
			await createHabit(habitData, user.id);
		} catch (e) {
			return { notify: true, type: 'error', message: e.message };
		}

		return { notify: true, type: 'success', message: "Habit created succefully!" };
	},

	logout: async (event: RequestEvent) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);


		return redirect(302, '/login');
	}
};
