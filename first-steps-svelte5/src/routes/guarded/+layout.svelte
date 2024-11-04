<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Snippet } from 'svelte';
	import '../../app.css';
	import { user, type ShowableUser } from '$lib/stores/user';

	let { data, children }: { data: { user: ShowableUser }; children: Snippet } = $props();

	user.set(data!.user);
</script>

<div class="top-bar">
	<div class="container">
		<div class="user-info">
			<h1>Hi, {data.user.username}!</h1>
			<p>User ID: {data.user.id}</p>
		</div>

		<form method="post" action="?/logout" use:enhance class="logout-form">
			<button class="logout-button">Sign out</button>
		</form>
	</div>
</div>

<div class="page-content">
	{@render children()}
</div>

<style>
	.top-bar {
		@apply bg-gray-800 py-4 text-white shadow-md;
	}

	.container {
		@apply mx-auto flex items-center justify-between px-4;
	}

	.user-info h1 {
		@apply text-xl font-semibold;
	}

	.user-info p {
		@apply text-sm text-gray-300;
	}

	.logout-form {
		@apply flex;
	}

	.logout-button {
		@apply rounded bg-red-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-red-600;
	}

	.page-content {
		@apply container mx-auto mt-6 px-4;
	}
</style>
