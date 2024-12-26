<script>
  import { createEventDispatcher } from 'svelte';
  export let data;

  const dispatch = createEventDispatcher();
  let slides = [];

  function generateSlides() {
    // Generate slides from sections
    slides = data.map((section) => ({
      id: section.id,
      title: section.type.charAt(0).toUpperCase() + section.type.slice(1),
      content: section.content,
      type: section.type
    }));

    console.log('Generated slides:', slides); // Debug log
    dispatch('slidesGenerated', slides);
  }
</script>

<div class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-medium">
  <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
    Create Slides
  </h2>
  
  <button
    on:click={generateSlides}
    class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
  >
    Create Presentation
  </button>

  {#if slides.length > 0}
    <div class="mt-6 grid gap-4">
      {#each slides as slide}
        <div class="border rounded-lg p-4 dark:border-dark-border">
          <h3 class="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
            {slide.title}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {slide.content}
          </p>
        </div>
      {/each}
    </div>
  {/if}
</div>