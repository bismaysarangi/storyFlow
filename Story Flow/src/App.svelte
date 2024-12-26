<script>
  import FileUploader from './components/FileUploader.svelte';
  import ChartGenerator from './components/ChartGenerator.svelte';
  import ExportPresentation from './components/ExportPresentation.svelte';
  import SlideCreator from './components/SlideCreator.svelte';
  import ThemeSelector from './components/ThemeSelector.svelte';
  import { theme } from './stores/theme';

  let storyData = null;
  let slides = [];

  function handleFileUpload(event) {
    storyData = event.detail;
    console.log('App received data:', storyData); // Debug log
  }

  function handleSlideGeneration(event) {
    slides = event.detail;
    console.log('Slides generated:', slides); // Debug log
  }
</script>

<main class="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-200">
  <div class="container mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-primary-800 dark:text-primary-200">Story Flow</h1>
      <div class="mt-4 flex justify-end">
        <ThemeSelector />
      </div>
    </header>

    <div class="grid gap-8">
      <FileUploader on:fileUploaded={handleFileUpload} />
      
      {#if storyData}
        <div class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-medium">
          <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {storyData.title}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            By {storyData.author} - {storyData.date}
          </p>
        </div>

        <ChartGenerator data={storyData.sections} />
        <SlideCreator 
          data={storyData.sections} 
          on:slidesGenerated={handleSlideGeneration}
        />
      {/if}

      {#if slides.length > 0}
        <ExportPresentation {slides} />
      {/if}
    </div>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, sans-serif;
  }
</style>