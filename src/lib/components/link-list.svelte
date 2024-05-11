<script lang="ts">
	let {
		links
	}: {
		links: {
			id: number;
			url: string;
			short: string;
			shortUrl: string;
		}[];
	} = $props();
</script>

<div class="">
	{#each links as link}
		<article class="border-t p-4 last:border-b-[1px] dark:hover:bg-black">
			<a target="_blank" href={`${link.shortUrl}`}>{link.url}</a>
		</article>
	{/each}
</div>
