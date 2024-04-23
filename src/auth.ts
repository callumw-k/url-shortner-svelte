import { SvelteKitAuth } from '@auth/sveltekit';
import google from '@auth/sveltekit/providers/google';

export const { handle, signIn } = SvelteKitAuth({
	providers: [google]
});
