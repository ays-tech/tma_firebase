<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { retrieveLaunchParams } from '@telegram-apps/sdk';
  import { push } from 'svelte-spa-router';

  const { initData } = retrieveLaunchParams();

  // Function to navigate to the referrals page
  function goToReferrals() {
    push('/referrals'); // Navigate to referrals.svelte
  }
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3 text-center">
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Mini Apps Quest
  </h1>
  <p class="leading-7">
    Hello, how are you @{initData?.user?.username}! Let's figure a way.
  </p>

  <!-- Button to navigate to the referrals page -->
  <Button on:click={goToReferrals}>
    Go to Referrals
  </Button>
</div>
