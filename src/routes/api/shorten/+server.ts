import { postToApi } from '$lib/api-utils';
import { error, type RequestHandler } from '@sveltejs/kit';
import { z } from 'zod';

const urlSchema = z.object({
	url: z.string()
});

export const POST: RequestHandler = async ({ request }) => {
	const res = await request.json();
	//validate using zod

	const parsed = urlSchema.safeParse(res);

	if (!parsed.success) {
		error(400, parsed.error);
	}

	const data = await postToApi(parsed.data.url);
	return new Response(JSON.stringify(data));
};
