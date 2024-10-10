import { getSummaries, deleteSummary, onStorageChange, saveSummary } from "./storage";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "./colinho";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        console.log("Fetched summaries:", items);  // Log fetched summaries for debugging

        // Ensure that each summary has a 'createdAt' property
        const updatedItems = Object.entries(items).map(([id, summary]) => {
          if (!summary.createdAt) {
            summary.createdAt = Date.now();  // Assign a timestamp if missing
            saveSummary(id, summary);  // Save the updated summary back to storage
          }
          return { id, ...summary };
        });

        // Sort summaries by `createdAt`
        const sortedSummaries = updatedItems.sort((a, b) => b.createdAt - a.createdAt);

        // Convert back to an object
        const sortedObject = sortedSummaries.reduce((acc, summary) => {
          acc[summary.id] = summary;
          return acc;
        }, {});

        setSummaries(sortedObject);
      })
      .catch((error) => {
        console.error("Error retrieving summaries:", error);
      });
  };

  const handleDelete = (id) => {
    deleteSummary(id)
      .then(() => {
        fetchSummaries();
      })
      .catch((error) => {
        console.error("Error deleting summary:", error);
      });
  };

  const handleDeleteAll = () => {
    const summaryIds = Object.keys(summaries);

    Promise.all(summaryIds.map((id) => deleteSummary(id)))
      .then(() => {
        setSummaries({});
      })
      .catch((error) => {
        console.error("Error deleting all summaries:", error);
      });
  };

  const downloadSummary = (id, summaryData) => {
    const { url, title = "", summary } = summaryData;

    const textContent = `ID: ${id}\nURL: ${url}\nTitle: ${title}\nSummary: ${summary}`;

    const blob = new Blob([textContent], { type: "text/plain" });

    const fileName = `TLDRsummary-${title || url}.txt`;

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
    const updatedSummary = { ...summaries[id], title: newTitle };
    chrome.storage.local.set({ [id]: updatedSummary }, () => {
      fetchSummaries(); // Refresh the summaries after the title is updated
    });
  };

  useEffect(() => {
    fetchSummaries();
    onStorageChange(() => {
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
