import { getSummaries, deleteSummary, onStorageChange } from "./storage";
import React, { useEffect, useState } from "react";

const useSavedSummaries = function () {
  const [summaries, setSummaries] = useState({});

  const fetchSummaries = () => {
    getSummaries()
      .then((items) => {
        const copy = { ...items };
        delete copy.selectedTextForAI;
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
    fetchSummaries,
  };
};
export default useSavedSummaries;