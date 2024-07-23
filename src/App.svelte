<script lang="ts">
	import './app.css';

	import Router from 'svelte-spa-router';

	import Home from './routes/Home.svelte';
	import About from './routes/About.svelte';
	import NotFound from './routes/NotFound.svelte';

	let routes = {
		'/': Home,
		'/about': About,
		'*': NotFound
	};
</script>

<main>
	<Router {routes} />
</main>
