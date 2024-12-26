<script>
  import { onMount } from 'svelte';
  export let slides;
  
  let pdfMake;
  
  onMount(async () => {
    // Dynamically import pdfmake
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    pdfMake = pdfMakeModule.default;
    pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
  });

  function exportToPDF() {
    const docDefinition = {
      content: [
        {
          text: 'Story Presentation',
          style: 'header'
        },
        ...slides.map(slide => [
          {
            text: slide.title,
            style: 'slideTitle'
          },
          {
            text: slide.content,
            style: 'slideContent'
          },
          { text: '', margin: [0, 20] } // Spacer between slides
        ]).flat()
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 20]
        },
        slideTitle: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        slideContent: {
          fontSize: 14,
          margin: [0, 0, 0, 20]
        }
      }
    };

    try {
      pdfMake.createPdf(docDefinition).download('story_presentation.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Error generating PDF. Please try again.');
    }
  }

  function exportToPowerPoint() {
    // Create a simple text file as PPTX alternative
    const content = slides.map(slide => 
      `Slide: ${slide.title}\n${slide.content}\n\n`
    ).join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'story_presentation.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  let loading = false;
  
  async function handleExport(type) {
    loading = true;
    try {
      if (type === 'pdf') {
        await exportToPDF();
      } else {
        await exportToPowerPoint();
      }
    } catch (error) {
      console.error(`Error exporting to ${type}:`, error);
      alert(`Error exporting to ${type}. Please try again.`);
    } finally {
      loading = false;
    }
  }
</script>

<div class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-medium">
  <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
    Export Presentation
  </h2>
  
  <div class="flex gap-4">
    <button
      on:click={() => handleExport('pdf')}
      disabled={loading}
      class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      {#if loading}
        <span class="mr-2">Exporting...</span>
      {:else}
        Export as PDF
      {/if}
    </button>
    
    <button
      on:click={() => handleExport('pptx')}
      disabled={loading}
      class="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
    >
      {#if loading}
        <span class="mr-2">Exporting...</span>
      {:else}
        Export as PowerPoint
      {/if}
    </button>
  </div>
</div>