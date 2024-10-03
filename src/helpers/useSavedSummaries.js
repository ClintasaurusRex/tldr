import { getSummaries, deleteSummary, onStorageChange } from "./storage";
import React, { useEffect, useState } from "react";
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

    Promise.all(summaryUrls.map((url) => deleteSummary(url)))  // Delete each summary
      .then(() => {
        setSummaries({});  // Clear the local state
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
  };
};

export default useSavedSummaries;
