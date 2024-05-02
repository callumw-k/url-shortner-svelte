<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.pcss';

	import { signOut } from '@auth/sveltekit/client';

	function signOutWrapper() {
		signOut();
	}
</script>

<!-- <header class="border-b"> -->
<!-- 	<nav class="mx-auto flex max-w-xl justify-end p-4"> -->
<!-- 		<Button on:click={signOutWrapper}>Sign Out</Button> -->
<!-- 	</nav> -->
<!-- </header> -->
<slot></slot>
