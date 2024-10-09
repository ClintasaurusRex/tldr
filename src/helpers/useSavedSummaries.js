import { getSummaries, deleteSummary, onStorageChange } from "./storage";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "./colinho";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        const copy = { ...items };
        delete copy.selectedTextForAI; // If you're excluding a specific item
        setSummaries(copy);
        console.log("Fetched Summaries: ", copy); // Debugging
      })
      .catch((error) => {
        console.error("Error retrieving summaries:", error);
      });
  };

  const handleDelete = (id) => {
    deleteSummary(id)
      .then(() => {
        fetchSummaries(); // Refresh the state
        console.log("Summary deleted: ", id);
      })
      .catch((error) => {
        console.error("Error deleting summary:", error);
      });
  };

  const handleDeleteAll = () => {
    const summaryIds = Object.keys(summaries);

    Promise.all(summaryIds.map((id) => deleteSummary(id)))  // Delete each summary
      .then(() => {
        setSummaries({});  // Clear the local state
        console.log("Deleted all summaries");
      })
      .catch((error) => {
        console.error("Error deleting all summaries:", error);
      });
  };

  const downloadSummary = (url, summary) => {
    const blob = new Blob([`URL: ${url}\nSummary: ${summary}`], {
      type: "text/plain",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "TLDRsummary.txt"; 
    link.click();
  };

  const [copiedSummaryId, setCopiedSummaryId] = useState(null);

  const handleCopy = (summary, id) => {
    copyToClipboard(summary, () => setCopiedSummaryId(id));
    setTimeout(() => setCopiedSummaryId(null), 3000);
  };

  useEffect(() => {
    fetchSummaries();
    onStorageChange(() => {
      fetchSummaries();
    });
  }, []);

  return {
    summaries,
    handleDelete,
    handleDeleteAll,
    fetchSummaries,
    downloadSummary,
    handleCopy,
    copiedSummaryId,
  };
};

export default useSavedSummaries;
