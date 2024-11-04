<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	let {
		message,
		type = 'info',
		duration = 4000
	}: {
		message: string;
		type?: 'success' | 'error' | 'info';
		duration?: number; // Duration to show the notification
	} = $props();

	const isVisible = writable(true);

	// Auto-dismiss the notification after timeout
	onMount(() => {
		const timeout = setTimeout(() => {
			isVisible.set(false);
		}, duration);

		return () => clearTimeout(timeout); // Clean up on component destroy
	});
</script>

{#if $isVisible}
	<div
		transition:fly={{ y: -30, duration: 80 }}
		class="z-20 fixed left-1/2 top-1 w-full max-w-sm -translate-x-1/2 transform rounded-lg p-4 shadow-lg"
		class:opacity-100={true}
		class:translate-y-4={true}
		class:bg-green-100={type === 'success'}
		class:bg-red-100={type === 'error'}
		class:bg-blue-100={type === 'info'}
		class:text-green-800={type === 'success'}
		class:text-red-800={type === 'error'}
		class:text-blue-800={type === 'info'}
	>
		<p class="font-semibold">{message}</p>
	</div>
{/if}
