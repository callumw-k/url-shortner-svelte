import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { postToApi } from '$lib/api-utils';
import { z } from 'zod';
import { PUBLIC_API_URL } from '$env/static/public';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const url = formData.get('url');
		const parsedUrl = z.string().url().safeParse(url);
		if (!parsedUrl.success) {
			return fail(400, { url, incorrect: true });
		}
		const data = await postToApi(parsedUrl.data.toString());
		return { data };
	}
} satisfies Actions;

const getPreviousLinks = async () => {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/api/recent/10`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = (await res.json()) as {
			links: {
				id: number;
				url: string;
				short: string;
				shortUrl: string;
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
