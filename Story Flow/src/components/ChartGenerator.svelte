<script>
  import { onMount } from 'svelte';
  export let data;

  let canvas;
  let ctx;

  $: if (canvas && data) {
    drawChart();
  }

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
      drawChart();
    }
  });

  function drawChart() {
    if (!ctx || !data) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw chart based on section data values
    const points = data.map((section, index) => ({
      x: index * (canvas.width / (data.length - 1)),
      y: canvas.height - (section.data.value * canvas.height / 100),
      label: section.type
    }));

    // Draw lines
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw points
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#0ea5e9';
      ctx.fill();
    });

    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px sans-serif';
    points.forEach(point => {
      ctx.fillText(point.label, point.x - 20, canvas.height - 10);
    });
  }
</script>

<div class="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-medium">
  <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
    Story Visualization
  </h2>
  <canvas
    bind:this={canvas}
    width={800}
    height={400}
    class="w-full"
  ></canvas>
</div>