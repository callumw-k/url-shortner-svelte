<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { signOut } from '@auth/sveltekit/client';
	import { z } from 'zod';
	import { PUBLIC_API_URL } from '$env/static/public';
	import LinkList from '$lib/components/link-list.svelte';

	let { data, form } = $props();
	let links = data.previousLinks;

	let shortenedUrl = $state('');

	function onButtonClick() {
		window.navigator.clipboard.writeText(form?.data?.shortUrl ?? shortenedUrl);
	}

	const responseSchema = z.object({
		url: z.string().url(),
		shortUrl: z.string()
	});

	async function attemptShorten() {
		try {
			const parsedUrl = await readClipboard();

			if (!parsedUrl.success) {
				return;
			}

			const hostname = new URL(parsedUrl.data).hostname;

			if (hostname === new URL(PUBLIC_API_URL).hostname) {
				return;
			}

			const response = await fetch('/api/shorten', {
				body: JSON.stringify({ url: parsedUrl.data }),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.debug(response);

			const data = await response.json();
			const parsedData = responseSchema.safeParse(data);
			if (parsedData.success) {
				let shortURl = parsedData.data.shortUrl;
				window.navigator.clipboard.writeText(shortURl);
				shortenedUrl = shortURl;
			}
		} catch (e) {
			console.error(e);
		}
	}

	async function readClipboard() {
		const text = await window.navigator.clipboard.readText();
		const parsedUrl = z.string().url().safeParse(text);
		return parsedUrl;
	}

	$effect(() => {
		attemptShorten();
	});
	$effect(() => {
		if (form?.data?.shortUrl) {
			shortenedUrl = form?.data?.shortUrl;
		}
	});
</script>

<svelte:window onfocus={attemptShorten} />

<main class="mt-12">
	<div class="mx-auto flex max-w-lg justify-center">
		<form use:enhance class="flex w-16 flex-1" method="post">
			<div class="flex w-full space-x-4">
				<Input type="text" name="url" />
				<Button type="submit">Shorten Url</Button>
			</div>
		</form>
	</div>
	{#if shortenedUrl}
		<div class="mt-8 flex items-center justify-center space-x-4">
			<a href={shortenedUrl}>{shortenedUrl}</a>
			<Button on:click={onButtonClick}>Copy</Button>
		</div>
	{/if}
	<LinkList {links} />

	<div class="mt-8 flex justify-center">
		<Button onclick={() => void signOut()}>Sign out</Button>
	</div>
</main>
