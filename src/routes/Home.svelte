<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';

	let MiniApp: any;

	const checkMiniApp = () => {
		if (window.Telegram?.WebApp) {
			MiniApp = window.Telegram.WebApp;
		} else {
			setTimeout(checkMiniApp, 100);
		}
	};

	onMount(() => {
		checkMiniApp();
	});
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3 text-center">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mini Apps Quest</h1>
	<p class="leading-7">
		{#if MiniApp}
			Hello, @{MiniApp.initDataUnsafe.user.username}!
		{/if}
	</p>
	<Button>Button</Button>
</div>
