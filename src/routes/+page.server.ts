import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SECRET_KEY } from '$env/static/private';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const url = data.get('url');
		if (!url) {
			return fail(400, { url, incorrect: true });
		}
		console.debug(url);
		const res = await fetch('https://cwk.lol/api/shorten', {
			headers: {
				'Content-Type': 'application/json',
				//add bearer token
				Authorization: `Bearer ${SECRET_KEY}`
			},
			body: JSON.stringify({ url: url.toString() }),
			method: 'post'
		});
		return await res.json();
	}
} satisfies Actions;

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	console.debug(session);
	if (!session?.user?.email) {
		return redirect(302, '/login');
	}
	return { session };
};
