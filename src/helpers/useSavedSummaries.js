import { getSummaries, deleteSummary, onStorageChange } from "./storage";
import { useEffect, useState } from "react";
import { copyToClipboard } from "./colinho";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        const copy = { ...items };
        delete copy.selectedTextForAI; // Assuming this is something you don't want
        setSummaries(copy);
      })
      .catch((error) => {
        console.error("Error retrieving summaries:", error);
      });
  };

  const handleDelete = (url) => {
    deleteSummary(url)
      .then(() => {
        fetchSummaries();
      })
      .catch((error) => {
        console.error("Error deleting summary:", error);
      });
  };

  const handleDeleteAll = () => {
    const summaryUrls = Object.keys(summaries);

    Promise.all(summaryUrls.map((url) => deleteSummary(url))) // Delete each summary
      .then(() => {
        setSummaries({}); // Clear the local state
      })
      .catch((error) => {
        console.error("Error deleting all summaries:", error);
      });
  };

  const downloadSummary = (id) => {
    const { url, title = "", summary } = summaryData; // Default title to empty string if not available

    const textContent = `ID: ${id}\nURL: ${url}\nTitle: ${title}\nSummary: ${summary}`; // Create the content for the text file

    const blob = new Blob([textContent], { type: "text/plain" }); // Create a blob for the text content

    const fileName = `TLDRsummary-${title || url}.txt`; // Use title or URL as the file name

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  const [copiedSummaryId, setCopiedSummaryId] = useState(null);

  const handleCopy = (summary, id) => {
    copyToClipboard(summary, () => setCopiedSummaryId(id));
    setTimeout(() => setCopiedSummaryId(null), 3000);
  };

  const updateTitle = (id, newTitle) => {
    const updatedSummary = { ...summaries[id], title: newTitle }; // Update the title in the summary
    chrome.storage.local.set({ [id]: updatedSummary }, () => {
      fetchSummaries(); // Refresh the summaries after the title is updated
    });
  };

  useEffect(() => {
    fetchSummaries();
    onStorageChange((changes) => {
      fetchSummaries();
    });
  }, []);

  return {
    summaries,
    setSummaries,
    handleDelete,
    handleDeleteAll,
    fetchSummaries,
    downloadSummary,
    handleCopy,
    copiedSummaryId,
    updateTitle,
  };
};

export default useSavedSummaries;
