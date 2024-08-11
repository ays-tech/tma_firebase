<script lang="ts">
	import './app.css';

	import Router, { pop, push } from 'svelte-spa-router';

	import { retrieveLaunchParams, postEvent, on } from '@telegram-apps/sdk';
	const { initData } = retrieveLaunchParams();

	import Home from './routes/Home.svelte';
	import About from './routes/About.svelte';
	import NotFound from './routes/NotFound.svelte';
	import { onMount } from 'svelte';
	import { referralRoutes } from './routes/Referral/referrals';

	let routes = {
		'/': Home,
		'/about': About,
		...referralRoutes,
		'*': NotFound
	};

	onMount(() => {
		postEvent('web_app_setup_back_button', { is_visible: true });

		on('back_button_pressed', (payload) => {
			pop();
		});

		const startParam = initData?.startParam;
		if (startParam) {
			push(`/newReferral/${startParam}`);
		}
	});
</script>

<main>
	<Router {routes} />
</main>
