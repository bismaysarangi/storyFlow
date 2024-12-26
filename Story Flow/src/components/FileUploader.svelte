<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let dragOver = false;
  let fileInput;

  function handleDragOver(e) {
    e.preventDefault();
    dragOver = true;
  }

  function handleDragLeave() {
    dragOver = false;
  }

  function handleDrop(e) {
    e.preventDefault();
    dragOver = false;
    const files = e.dataTransfer.files;
    handleFiles(files);
  }

  async function handleFiles(files) {
    const file = files[0];
    if (file && file.type === 'application/json') {
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        console.log('Uploaded data:', data); // Debug log
        dispatch('fileUploaded', data);
      } catch (error) {
        console.error('Error parsing JSON:', error); // Debug log
        alert('Error parsing JSON file');
      }
    } else {
      alert('Please upload a JSON file');
    }
  }

  function handleInputChange(e) {
    const files = e.target.files;
    handleFiles(files);
  }
</script>

<div
  class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
    {dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 dark:border-dark-border'}
    dark:bg-dark-surface"
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={() => fileInput.click()}
>
  <input
    type="file"
    accept=".json"
    class="hidden"
    bind:this={fileInput}
    on:change={handleInputChange}
  />
  <div class="text-lg mb-2 text-gray-700 dark:text-gray-200">
    Drag and drop your story file here
  </div>
  <div class="text-sm text-gray-500 dark:text-gray-400">
    or click to select a file
  </div>
</div>