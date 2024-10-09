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
        
        // Ensure each summary has a timestamp, if not already present
        for (const key in copy) {
          if (!copy[key].timestamp) {
            copy[key].timestamp = new Date().getTime();  // Add a timestamp if missing
          }
        }
        setSummaries(copy);
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

    Promise.all(summaryIds.map((id) => deleteSummary(id)))  // Delete each summary
      .then(() => {
        setSummaries({});  // Clear the local state
      })
      .catch((error) => {
        console.error("Error deleting all summaries:", error);
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

  const updateTitle = (id, newTitle) => {
    const updatedSummaries = { ...summaries };
    if (updatedSummaries[id]) {
      updatedSummaries[id].title = newTitle || updatedSummaries[id].url;  // Default to URL if title is empty
      saveSummary(id, updatedSummaries[id])
        .then(() => {
          setSummaries(updatedSummaries);
          console.log("Title updated for ID:", id);
        })
        .catch((error) => {
          console.error("Error updating title:", error);
        });
    }
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
    updateTitle
  };
};

export default useSavedSummaries;
