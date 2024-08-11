<script lang="ts">
	import { link, push } from 'svelte-spa-router';
	import { Timestamp } from 'firebase/firestore';

	import { retrieveLaunchParams } from '@telegram-apps/sdk';
	const { initData } = retrieveLaunchParams();

	import Button from '$lib/components/ui/button/button.svelte';

	import { formatDate } from '$lib/utils';
	import { createReferralUser, getReferralUserByID } from './referrals';

	export let params: { referrerID?: string } = {};
</script>

<main class="space-y-2 p-4">
	<h1 class="mb-2 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
		Welcome, @{initData?.user?.username}!
	</h1>

	<h2
		class="mt-10 scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		{#if params.referrerID}
			Link referrer ID: {params.referrerID}
		{:else}
			No referrer ID
		{/if}
	</h2>

	{#if initData?.user}
		{#await getReferralUserByID(initData?.user?.id.toString())}
			Getting user ...
		{:then user}
			{#if user.referrerID}
				<p class="font-semibold">
					Your current Referrer ID:
					<a
						href="/referral/{user.referrerID}"
						use:link
						class="font-medium text-primary underline underline-offset-4">@{user.referrerID}</a
					>
				</p>
			{:else}
				<p>You already joined without a referrer.</p>
			{/if}

			<p>⚠️ User already created. Cannot assign a referrer.</p>

			<p>User account created on {formatDate(user.createdAt.toDate())}.</p>

			<Button on:click={() => push(`/referral/${initData?.user?.id}`)}>View profile</Button>
		{:catch}
			<p>Seems like you are joining us for the first time 😉</p>

			{#await createReferralUser( { userID: initData.user.id.toString(), username: initData.user.username, referrerID: params.referrerID, createdAt: Timestamp.now() } )}
				<p>Creating referral user ...</p>
			{:then}
				<p>Created referral user with referrerID as {params.referrerID}</p>

				<Button on:click={() => push(`/referral/${initData?.user?.id}`)}>View profile</Button>
			{/await}
		{/await}
	{/if}
</main>
