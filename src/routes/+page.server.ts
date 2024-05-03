import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { SECRET_KEY } from '$env/static/private';

const localUrl = 'http://localhost:3333';
const prodUrl = 'https://cwk.lol';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const url = formData.get('url');
		if (!url) {
			return fail(400, { url, incorrect: true });
		}
		const res = await fetch(`${prodUrl}/api/shorten`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${SECRET_KEY}`
			},
			body: JSON.stringify({ url: url.toString() }),
			method: 'post'
		});
		const data = (await res.json()) as { url: string; shortUrl: string };
		return { data };
	}
} satisfies Actions;

const getPreviousLinks = async () => {
	try {
		const res = await fetch(`${prodUrl}/api/recent/10`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = (await res.json()) as {
			links: {
				id: number;
				url: string;
				short: string;
			}[];
		};
		return data;
	} catch (e) {
		return { links: [] };
	}
};

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();
	if (!session?.user?.email) {
		return redirect(302, '/login');
	}

	const previousLinks = (await getPreviousLinks()).links;

	return { session, previousLinks };
};
