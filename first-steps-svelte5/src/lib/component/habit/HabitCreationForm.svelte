<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function enhanceForm(form: HTMLFormElement) {
		return enhance(form, async (all) => {
			console.log(all);
			if (all) {
				dispatch('submitSuccess');
			}
		});
	}
</script>

<form method="POST" action="?/createHabit" use:enhanceForm class="form-container">
	<div class="form-field">
		<label for="title" class="form-label">Title</label>
		<input
			type="text"
			id="title"
			name="title"
			class="input-field"
			placeholder="e.g., Morning Yoga"
			required
		/>
	</div>

	<div class="form-field">
		<label for="description" class="form-label">Description</label>
		<textarea
			id="description"
			name="description"
			class="input-field"
			placeholder="A short description..."
			required
		></textarea>
	</div>

	<div class="form-field">
		<label for="deadline" class="form-label">Deadline</label>
		<input type="date" id="deadline" name="deadline" class="input-field" required />
	</div>

	<div class="form-field flex items-center">
		<input type="checkbox" id="notifications" name="notifications" class="checkbox" />
		<label for="notifications" class="checkbox-label">Receive daily notifications</label>
	</div>

	<button type="submit" class="submit-button">Create Habit</button>
</form>

<style>
	.form-container {
		@apply mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md;
	}

	.form-field {
		@apply mb-4;
	}

	.form-label {
		@apply block text-sm font-medium text-gray-700;
	}

	.input-field {
		@apply mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm;
	}

	.checkbox {
		@apply h-4 w-4 rounded border-gray-300 text-blue-600;
	}

	.checkbox-label {
		@apply ml-2 block text-sm font-medium text-gray-700;
	}

	.submit-button {
		@apply w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700;
	}
</style>
