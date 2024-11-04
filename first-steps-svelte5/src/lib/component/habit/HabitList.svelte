<script lang="ts">
	import type { Habit } from '$lib/server/db/schema';

	let { habits }: { habits: Habit[] } = $props();
</script>
<div class="habit-list">
  {#if habits.length > 0}
    {#each habits as habit}
      <div class="habit-item">
        <div class="habit-header">
          <h2 class="habit-title">{habit.title}</h2>
          <div class="habit-info">
            <span class="habit-id">#{habit.id}</span>
            <span class="habit-notifications">Notif: {habit.notifications ? '✅' : '❌'}</span>
          </div>
        </div>

        <div class="habit-main">
          <p class="habit-description" title={habit.description}>
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
    {/each}
  {:else}
    <p class="no-habits">You have no habits yet. Start creating one!</p>
  {/if}
</div>

<style>
  .habit-list {
    @apply mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3;
  }

  .habit-item {
    @apply flex flex-col rounded-lg bg-gray-100 p-4 shadow-md transition hover:shadow-lg;
  }

  .habit-header {
    @apply flex items-start justify-between mb-4;
  }

  .habit-title {
    @apply text-lg font-semibold text-gray-800;
  }

  .habit-info {
    @apply flex flex-col items-end text-sm text-gray-400 space-y-1;
  }
  .habit-id:hover {
    @apply cursor-pointer text-gray-600;
  }

  .habit-main {
    @apply mb-4 flex;
  }
  .habit-description {
    @apply line-clamp-3 text-sm text-gray-600 flex-grow;
    max-width: 66.67%;
    overflow-wrap: anywhere;
  }

  .habit-dates {
    @apply mt-auto flex flex-col items-end text-right text-sm text-gray-400;
  }

  .habit-description:hover {
    @apply line-clamp-none bg-gray-200 rounded-md px-1;
  }
</style>