<script lang="ts">
	import { Button  } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { signOut } from '@auth/sveltekit/client';

	export let form: ActionData;
  function signOutWrapper() {
    signOut()
  }
</script>

<main class="mt-4 px-4">
	<div class="mx-auto flex max-w-lg justify-center">
		<form use:enhance class="flex flex-1" method="post">
			<div class="flex w-full space-x-4">
				<Input type="text" name="url" />
				<Button type="submit">Shorten Url</Button>
			</div>
		</form>
	</div>
	<pre>{JSON.stringify(form, null, 2)}</pre>
  <Button on:click={signOutWrapper}>Sign Out</Button>
</main>
