<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		isOpen = $bindable(),
		closeOnOutsideClick = true,
		children
	}: {
		isOpen: boolean;
		closeOnOutsideClick?: boolean;
		children: Snippet;
	} = $props();

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	function handleOverlayClick(event: MouseEvent) {
		if (closeOnOutsideClick && event.target === event.currentTarget) {
			close();
		}
	}
</script>

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay z-10" onclick={handleOverlayClick}>
		<div class="modal-container">
			<button type="button" onclick={close} class="close-button" aria-label="Close">
				&times;
			</button>

			{@render children()}
		</div>
	</div>
{/if}

<style>
	.overlay {
		@apply fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75;
	}

	.modal-container {
		@apply relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg;
	}

	.close-button {
		@apply absolute right-2 top-2 text-gray-500 hover:text-gray-700;
	}
</style>
