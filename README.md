# Story Flow

`storyFlow` is a web application built with Svelte and Tailwind CSS that allows users to upload a JSON story file, visualize it through charts, create presentation slides, and export them in various formats (PDF or PowerPoint).

## Features

- **File Upload**: Users can upload a JSON file containing story data, including sections with various content types.
- **Chart Generation**: A chart visualization of the story sections is created based on the data in the uploaded file.
- **Slide Creation**: Presentation slides are generated automatically from the sections of the story.
- **Export Presentation**: Users can export the generated presentation as a PDF or a simple PowerPoint (TXT) file.
- **Dark/Light Theme**: Switch between light and dark modes for better usability and aesthetics.

## Project Structure

The project is organized into components and stores for clean separation of concerns:

- **FileUploader.svelte**: Allows the user to upload a JSON file and triggers the `fileUploaded` event.
- **ChartGenerator.svelte**: Displays a chart based on the uploaded story data.
- **SlideCreator.svelte**: Generates presentation slides from the sections of the story.
- **ExportPresentation.svelte**: Handles the export of the generated slides as PDF or PowerPoint (TXT).
- **ThemeSelector.svelte**: A button to toggle between light and dark themes.
- **stores/theme.js**: A store for managing the current theme state (`light` or `dark`).

## Installation

To get started with the `storyFlow` project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/bismaysarangi/storyFlow.git
cd storyFlow
npm install
```

## Development

Run the development server to preview the app in your local environment:

```bash
npm run dev
```

By default, the app will be available at [http://localhost:3000](http://localhost:3000).

## Components Overview

### 1. **FileUploader.svelte**
   - Handles drag-and-drop or click-to-upload functionality for JSON files.
   - Dispatches `fileUploaded` event with the parsed data when a valid file is uploaded.

### 2. **ChartGenerator.svelte**
   - Displays a chart visualizing the data from the uploaded JSON.
   - The chart is drawn on a canvas element.

### 3. **SlideCreator.svelte**
   - Automatically generates presentation slides based on the uploaded story's sections.
   - Each slide includes a title and content based on the section's type and content.

### 4. **ExportPresentation.svelte**
   - Allows exporting the generated slides as a PDF or PowerPoint (TXT) file.
   - Uses the `pdfmake` library to generate PDFs.

### 5. **ThemeSelector.svelte**
   - Allows users to toggle between light and dark themes.

## Technologies Used

- **Svelte**: Frontend framework for building interactive UIs.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **pdfmake**: Library used for generating PDFs in the app.

## Contributing

If you want to contribute to the project, feel free to fork the repository and create a pull request. Ensure that your changes are well-documented, and consider adding tests for any new features.

## License

This project is licensed under the MIT License.
