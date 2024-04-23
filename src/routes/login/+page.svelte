<script>
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
  import { SignIn } from "@auth/sveltekit/components";
</script>

<div class="flex justify-center mt-4 px-4">
  <SignIn className={cn(buttonVariants({ variant: "default", size: "default", className: "" }))} provider="google" signInPage="login" >
    <span slot="submitButton">Sign in</span>
  </SignIn>
</div> 
