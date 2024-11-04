<script lang="ts">
	import HabitCreationForm from '$lib/component/habit/HabitCreationForm.svelte';
	import Modal from '$lib/component/Modal.svelte';
	import { writable } from 'svelte/store';
	import type { ActionData, PageServerLoad } from '../$types';
	import HabitList from '$lib/component/habit/HabitList.svelte';
	import type { Habit } from '$lib/server/db/schema';
	import type { ShowableUser } from '$lib/stores/user';
	import Notifiation from '$lib/component/Notifiation.svelte';

	let { data, form }: { data: { habits: Habit[]; user: ShowableUser }; form: ActionData } =
		$props();

	const isModalOpen = writable(false);

	function openModal() {
		isModalOpen.set(true);
	}

	function closeModal() {
		isModalOpen.set(false);
	}

	$inspect(data);
</script>

<section class="habit-section">
	<div class="header">
		<h1 class="section-title">Your Habits</h1>
		<button onclick={openModal} class="open-modal-button">Add New Habit</button>
	</div>
	
	<Modal bind:isOpen={$isModalOpen} on:close={closeModal}>
		<HabitCreationForm on:submitSuccess={closeModal} />
	</Modal>

	{#if form?.notify}
		<Notifiation message={form.message} type={form.type} />
	{/if}

	<HabitList habits={data.habits} />
</section>

<style>
	.habit-section {
		@apply container mx-auto mt-6 px-4;
	}

	.header {
		@apply mb-4 flex items-center justify-between;
	}

	.section-title {
		@apply text-2xl font-bold text-gray-800;
	}

	.open-modal-button {
		@apply rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700;
	}
</style>
