# React Chrome Extension Boilerplate

### Getting Started
1. Copy the repo using the `Use this template` button
2. Clone the copy to your local machine
3. Run `npm install` to install the dependencies
4. Run `npm run build` to build the extension into the `dist` directory
5. Inside Chrome, load the `dist` directory as an unpacked extension

### Update `manifest.json`
* The mainfest file can be found in `src/static`. This file will be copied to the `dist` directory when the extension is built.
* Update your extension's name, version, description, title, and icons. 
* Update the `permissions` array as needed.
* Remove content and/or background scripts if not needed.

### Scripts
* `start`: Run webpack in watch mode using the development configuration. Rebuilds the app when files are saved. Note: some changes will require the extension to be reloaded in Chrome.
* `build`: Build the project to the `dist` directory using the production configuration.

### Customizing the Extension
* Add static assets (images, icons, etc) to `src/static`
* The React and SCSS files for the popup and options pages are in `src/popup` and `src/options` respectively
* Add background workers to `src/background/background.js`. These scripts will run in the background while the extension popup is closed.
* Add webpage interaction to `src/content-script/content-script.js`. This script will have access to the DOM and will be able to read information and manipulate the webpage.
