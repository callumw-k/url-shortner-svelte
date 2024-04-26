import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { signIn } from '../../auth';
import type { Actions } from './$types';

export const actions: Actions = { default: signIn  };

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (session?.user?.email) {
		return redirect(302, '/');
	}
	return { session };
};
