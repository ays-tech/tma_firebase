<script lang="ts">
	import './app.css';

	import Router, { pop, push } from 'svelte-spa-router';

	import { postEvent, on } from '@telegram-apps/sdk';

	import Home from './routes/Home.svelte';
	import About from './routes/About.svelte';
	import NotFound from './routes/NotFound.svelte';
	import { onMount } from 'svelte';

	let routes = {
		'/': Home,
		'/about': About,
		'*': NotFound
	};

	onMount(() => {
		postEvent('web_app_setup_back_button', { is_visible: true });

		on('back_button_pressed', (payload) => {
			pop();
		});
		});
</script>

<main>
	<Router {routes} />
</main>
