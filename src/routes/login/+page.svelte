<script>
	import { Button } from '$lib/components/ui/button';
	import { signIn } from '@auth/sveltekit/client';
</script>

<div class="mt-4 flex justify-center px-4">
	<Button on:click={() => void signIn()}>Sign in</Button>
</div>
