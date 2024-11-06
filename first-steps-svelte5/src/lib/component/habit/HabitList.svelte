<script lang="ts">
	import type { Habit } from '$lib/server/db/schema';
	import Modal from '../Modal.svelte';
	import HabitCard from './HabitCard.svelte';

	let { habits }: { habits: Habit[] } = $props();

	let isModalOpen = $state(false);
	let selectedHabit: Habit | null = $state(null);

	function openModal(habit: Habit) {
		selectedHabit = habit;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		selectedHabit = null;
	}
</script>

<div class="habit-list">
	{#if habits.length > 0}
		{#each habits as habit}
			<HabitCard {habit} on:click={() => openModal(habit)} />
		{/each}
	{:else}
		<p class="no-habits">You have no habits yet. Start creating one!</p>
	{/if}
</div>

{#if isModalOpen && selectedHabit}
  <Modal bind:isOpen={isModalOpen} on:close={closeModal}>
        <HabitCard habit={selectedHabit}/>
  </Modal>
{/if}

<style>
	.habit-list {
		@apply mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
	}
</style>
