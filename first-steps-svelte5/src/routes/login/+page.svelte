<script lang="ts">
	import { enhance } from '$app/forms';
	import Notifiation from '$lib/component/Notifiation.svelte';
	import '../../app.css';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

{#if form?.notify}
	<Notifiation message={form.message} type={form.type} duration={5000} />
{/if}

<div class="flex min-h-screen items-center justify-center bg-gray-900 text-white">
	<div class="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
		<h1 class="mb-6 text-center text-2xl font-semibold">Login / Register</h1>

		<form method="post" action="?/login" use:enhance class="space-y-4">
			<label class="block">
				<span class="text-gray-300">Username</span>
				<input name="username" class="input-field" required />
			</label>

			<label class="block">
				<span class="text-gray-300">Password</span>
				<input type="password" name="password" class="input-field" required />
			</label>

			<div class="flex space-x-4">
				<button class="button-primary">Login</button>
				<button formaction="?/register" class="button-secondary">Register</button>
			</div>
		</form>
	</div>
</div>

<!-- Component-Specific Styles -->
<style>
	.input-field {
		@apply mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring focus:ring-blue-500;
	}

	.button-primary {
		@apply w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition duration-200 hover:bg-blue-600;
	}

	.button-secondary {
		@apply w-full rounded-md bg-green-500 py-2 font-semibold text-white transition duration-200 hover:bg-green-600;
	}
</style>
