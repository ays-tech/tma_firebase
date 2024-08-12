<script lang="ts">
	import { onMount } from 'svelte';
	import { push, link } from 'svelte-spa-router';

	import { postEvent, retrieveLaunchParams } from '@telegram-apps/sdk';
	const { initData } = retrieveLaunchParams();

	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import { Toaster } from '$lib/components/ui/sonner';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { Copy, Share, Trash2 } from 'lucide-svelte';

	import { formatDate } from '$lib/utils';
	import { deleteReferralUser, getReferralUserByID, getReferredUsers } from './referrals';

	export let params: { userID: string };

	let referralLink: string;
	let shareLink: string;

	$: isCurrentUser = initData?.user?.id.toString() === params.userID;

	onMount(async () => {
		referralLink = `https://t.me/MiniAppsQuestDevBot/Referral?startapp=${initData?.user?.id}`;
		const shareText = `\n@${initData?.user?.username} is inviting you to MiniAppQuest Referral App`;
		shareLink = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`;
	});

	function copyReferralLink() {
		navigator.clipboard.writeText(referralLink);
		toast.success('Referral link copied!');
	}

	function openShareLink() {
		postEvent('web_app_open_link', { url: shareLink });
	}
</script>

<main class="flex flex-col items-start">
	{#await getReferralUserByID(params.userID)}
		<p class="p-4">Getting user ...</p>
	{:then user}
		<section>
			<h1 class="mb-2 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl">
				Referrer: @{user.username}
			</h1>

			<p>Joined on {formatDate(user.createdAt.toDate())}. ID: {user.userID}</p>

			{#if user.referrerID}
				{#await getReferralUserByID(user.referrerID)}
					<p>Getting referrer ...</p>
				{:then referrer}
					<p class="text-lg font-semibold">
						Referred by: <a
							href="/referral/{referrer.userID}"
							use:link
							class="font-medium text-primary underline underline-offset-4">@{referrer.username}</a
						>
					</p>
				{:catch error}
					<p>Something went wrong fetching referrer ({user.referrerID}): {error.message}</p>
				{/await}
			{:else}
				<p class="text-lg font-semibold">Joined without a referrer.</p>
			{/if}

			{#if isCurrentUser}
				<div class="mt-4 flex flex-wrap gap-2">
					<Button on:click={copyReferralLink}>
						<Copy class="mr-2 h-4 w-4" />
						Copy referral link</Button
					>
					<Button on:click={openShareLink}>
						<Share class="mr-2 h-4 w-4" />
						Share referral link</Button
					>
				</div>
			{:else}
				<Button on:click={() => push(`/referral/${initData?.user?.id}`)}
					>See your own referrals</Button
				>
			{/if}
		</section>

		<Separator />

		<section>
			<h2
				class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
			>
				Referred Users
			</h2>

			{#await getReferredUsers(params.userID)}
				<p>Getting referred users ...</p>
			{:then value}
				{#if value}
					<ul class="ml-6 list-disc [&>li]:mt-2">
						{#each value as referral}
							<li>
								<a
									href="/referral/{referral.userID}"
									use:link
									class="font-medium text-primary underline underline-offset-4"
									>@{referral.username}</a
								>
								, on {formatDate(referral.createdAt.toDate())}
							</li>
						{/each}
					</ul>

					<p class="text-lg">Referred users count: <span class="font-bold">{value.length}</span></p>
				{:else}
					<p>No referred users</p>
				{/if}
			{:catch error}
				<p>Something went wrong: {error.message}</p>
			{/await}
		</section>

		{#if isCurrentUser}
			<Separator />

			<section>
				<Button variant="destructive" on:click={() => deleteReferralUser(user)}>
					<Trash2 class="mr-2 h-4 w-4" />
					Delete account
				</Button>
			</section>
		{/if}
	{:catch}
		<section>
			<p>User not found</p>
			<Button on:click={() => push('/newReferral')}>Create new user profile</Button>
		</section>
	{/await}

	<Toaster />
</main>

<style>
	section {
		@apply flex flex-col gap-2 p-4;
	}
</style>
