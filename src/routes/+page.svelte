<script lang="ts">
	import { onMount } from 'svelte';

	let MiniApp: any;

	const checkMiniApp = () => {
		if (window.Telegram && window.Telegram.WebApp) {
			MiniApp = window.Telegram.WebApp;
		} else {
			setTimeout(checkMiniApp, 100);
		}
	};

	onMount(() => {
		checkMiniApp();
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="text-center">
		<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mini Apps Quest</h1>
		<p class="leading-7 [&:not(:first-child)]:mt-6">
			{#if MiniApp}
				Hello, @{MiniApp.initDataUnsafe.user.username}!
			{/if}
		</p>
	</div>
</div>
