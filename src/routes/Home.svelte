<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { retrieveLaunchParams } from '@telegram-apps/sdk';
	const { initData } = retrieveLaunchParams();
</script>

<div class="flex h-screen flex-col items-center justify-center gap-3 text-center">
	<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Mini Apps Quest</h1>
	<p class="leading-7">
		Hello, hy ho are you @{initData?.user?.username}! lets figure a way btn
	</p>
</div>
