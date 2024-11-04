<script lang="ts">
	import HabitCreationForm from '$lib/component/HabitCreationForm.svelte';
	import Modal from '$lib/component/Modal.svelte';
	import Notifiation from '$lib/component/Notifiation.svelte';
	import { writable } from 'svelte/store';
	import type { ActionData } from '../$types';

	let { data, form }: { form: ActionData } = $props();

	const isModalOpen = writable(false);

	function openModal() {
		isModalOpen.set(true);
	}

	function closeModal() {
		isModalOpen.set(false);
	}

	$inspect(data);
</script>

<button onclick={openModal} class="open-modal-button"> Add New Habit </button>

<Modal bind:isOpen={$isModalOpen} on:close={closeModal}>
	<HabitCreationForm on:submitSuccess={closeModal} />
</Modal>

{#if form?.notify}
	<Notifiation message={form.message} type={form.type} />
{/if}

<style>
	.open-modal-button {
		@apply rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700;
	}
</style>
