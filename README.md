# TLDR Chrome Extension

## Overview

The TLDR Chrome Extension is a powerful tool designed to help users quickly understand and manage web content. With this extension, users can easily summarize selected text, store and manage their summaries, and access a variety of additional features to enhance their browsing experience.

## Features

- **Text Summarization**: Quickly summarize selected text to grasp the main points without reading the entire content.
- **Summarize Entire Web Pages**: Instantly summarize the entire content of any web page.
- **Store Summaries**: Save summarized texts and have options to copy and paste them for use in other documents or applications.
- **Bookmark Articles**: Save articles for easy access later.
- **CRUD Functionality**: Create, read, update, and delete notes related to your summaries.
- **Integrated Dictionary**: Look up definitions or meanings of specific terms within the text using A.I
 (e.g., PDF, Word, plain text).
- **History**: Maintain a history of your summarized texts for future reference.
- Download summary as a text file

### Installation

1. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/ClintasaurusRex/tldr-extension.git
    cd tldr-extension
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Build the extension:
    ```sh
    npm run build
    ```


4. Load the extension in Chrome:
    - Open Chrome and navigate to `chrome://extensions/`.
    - Enable "Developer mode" by clicking the toggle switch in the top right corner.
    - Click the "Load unpacked" button and select the `dist` directory from your project.

## Usage

- Click the TLDR extension icon in the Chrome toolbar to open the popup.
- Select text on any webpage and right-click to use the "Send to the extension" context menu option.
- Manage your summaries, notes, and settings from the extension popup.

## Options

- **Summary Length**: Adjust the length of the summaries.
- **Dark Mode**: Toggle dark mode for the extension interface.