<script lang="ts">
	import type { Habit } from '$lib/server/db/schema';
	import { createEventDispatcher } from 'svelte';

	let { habit }: { habit: Habit } = $props();
	let hasDescription = $derived(habit.description && habit.description.length > 0);

	const dispatch = createEventDispatcher();
</script>

<div
	class="habit-item"
	onclick={() => dispatch('click', { habit })}
	tabindex="0"
	role="button"
	onkeydown={(e) => e.key === 'Enter' && dispatch('click', { habit })}
>
	<div class="habit-header">
		<h2 class="habit-title">{habit.title}</h2>
		<div class="habit-info">
			<button
				type="button"
				class="habit-id"
				onclick={(e) => {
					e.stopPropagation();
					navigator.clipboard.writeText(habit.id);
				}}
				title="Click to copy ID"
			>
				#{habit.id}
			</button>

			<span class="habit-notifications">Notif: {habit.notifications ? '✅' : '❌'}</span>
		</div>
	</div>

	<div class="habit-main">
		<p
			class:habit-description={hasDescription}
			title={habit.description}
			class:habit-no-description={!hasDescription}
		>
			{#if habit.description && habit.description.length > 0}
				{habit.description}
			{:else}
				No description available.
			{/if}
		</p>
	</div>

	<div class="habit-dates">
		<p>Start: {new Date(habit.startAt).toLocaleDateString()}</p>
		<p>Deadline: {new Date(habit.deadline).toLocaleDateString()}</p>
	</div>
</div>

<style>
	.habit-item {
		@apply flex flex-col rounded-lg bg-gray-100 p-4 shadow-md transition hover:shadow-lg;
	}

	.habit-header {
		@apply mb-4 flex items-start justify-between;
	}

	.habit-title {
		@apply text-lg font-semibold text-gray-800;
	}

	.habit-info {
		@apply flex flex-col items-end space-y-1 text-sm text-gray-400;
	}

	.habit-id {
		@apply cursor-pointer border-none bg-transparent p-0 text-gray-400 hover:text-gray-600;
	}
	.habit-id:hover {
		@apply cursor-pointer text-gray-600;
	}

	.habit-main {
		@apply mb-4 flex;
	}
	.habit-description {
		@apply line-clamp-3 flex-grow text-sm text-gray-600;
		max-width: 66.67%;
		overflow-wrap: anywhere;
	}

	.habit-no-description {
		@apply text-gray-400;
	}

	.habit-dates {
		@apply mt-auto flex flex-col items-end text-right text-sm text-gray-400;
	}

	.habit-description:hover {
		@apply rounded-md bg-gray-200;
	}
</style>
