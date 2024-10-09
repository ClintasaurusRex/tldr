import { getSummaries, deleteSummary, onStorageChange, saveSummary } from "./storage";
import React, { useEffect, useState } from "react";
import { copyToClipboard } from "./colinho";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        const copy = { ...items };
        delete copy.selectedTextForAI;
        setSummaries(copy); // Store both title and summary
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

  const updateTitle = (id, newTitle) => {
    const updatedSummary = { ...summaries[id], title: newTitle };
    saveSummary(id, updatedSummary)
      .then(() => {
        fetchSummaries(); // Refresh summaries with new title
      })
      .catch((error) => {
        console.error("Error updating title:", error);
      });
  };

  const downloadSummary = (id, summary) => {
    const blob = new Blob([`ID: ${id}\nSummary: ${summary}`], {
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
    updateTitle,
    fetchSummaries,
    downloadSummary,
    handleCopy,
    copiedSummaryId,
  };
};

export default useSavedSummaries;
