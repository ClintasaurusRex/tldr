# Steps

1. ### Begin the process of creating the extension.
2. ### Text Selection
 - Detect text selection in the browser.
 - Decision: Was text selected?
 - Yes: Proceed to the next step.
 - No: Wait for user input.

3. ## Summarize text
  -Send selected text to a summarization API or run a local summarization

4. ## Display the summary
  - Display the summarized text in a popup or a sidebar.
  - Decision: Save Summary?
  - Yes: Proceed to save summary step.
  - No: End.

5. ##  Bookmark or Save Articles
   -  Save Article
   -  Add a button to bookmark the article.
   -  Decision: Bookmark Button Clicked?
   -  Yes: Save the article's URL and title to local storage.
   -  No: Wait for user action.

6. Access saved articles
  - Provide an interface to view saved articles
  - Decision: Open Saved Articles?
  - Yes: Display the list of saved articles.
  - No: End.

7. Store summarized text
  - Save summarized text to local storage

8. Copy to Clipboard
  - Add a "Copy to Clipboard" button next to the summary.
  - Decision: Button Clicked?
  - Yes: Copy the text to the clipboard.
  - No: End.

