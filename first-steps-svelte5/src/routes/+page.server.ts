import type { ShowableUser } from "$lib/stores/user";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export const load = async (event: RequestEvent) => {
	if (!event.locals.user) {
		return redirect(302, '/login');
	} else {
		return redirect(302, '/guarded')
	}
};
