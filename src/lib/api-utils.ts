import { SECRET_KEY } from '$env/static/private';
import { PUBLIC_API_URL } from '$env/static/public';

export async function postToApi(url: string) {
	const res = await fetch(`${PUBLIC_API_URL}/api/shorten`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${SECRET_KEY}`
		},
		body: JSON.stringify({ url }),
		method: 'post'
	});
	const data = (await res.json()) as { url: string; shortUrl: string };
	return data;
}
