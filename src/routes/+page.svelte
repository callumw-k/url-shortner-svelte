<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let links = data.previousLinks;

	let formValue = $state('');

	function onButtonClick() {
		window.navigator.clipboard.writeText(`https://cwk.lol/${form?.data?.shortUrl}`);
	}

	async function readClipboard() {
		const text = await window.navigator.clipboard.readText();
		formValue = text;
	}

	$effect(() => {
		readClipboard();
	});

	$effect(() => {
		if (form?.data?.shortUrl) {
			onButtonClick();
		}
	});
</script>

<main class="mt-12 px-4">
	<div class="mx-auto flex max-w-lg justify-center">
		<form use:enhance class="flex w-16 flex-1" method="post">
			<div class="flex w-full space-x-4">
				<Input bind:value={formValue} type="text" name="url" />
				<Button type="submit">Shorten Url</Button>
			</div>
		</form>
	</div>
	{#if form?.data?.url}
		<div class="mt-8 flex items-center justify-center space-x-4">
			<a href="https://cwk.lol/{form?.data?.shortUrl}">https://cwk.lol/{form?.data?.shortUrl}</a>
			<Button on:click={onButtonClick}>Copy</Button>
		</div>
	{/if}

	<div class="mt-8">
		<div class="text-center">
			<h2 class="text-xl">Previous links</h2>
		</div>
		<div class="mt-4 flex justify-center">
			<div class="flex flex-col items-start">
				{#each links as link}
					<div class="flex space-x-2">
						<p>{new URL(link.url).hostname}:</p>
						<a class="underline" href={`https://cwk.lol/${link.short}`}
							>https://cwk.lol/{link.short}</a
						>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
