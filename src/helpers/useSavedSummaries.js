import { getSummaries, deleteSummary } from "./storage";
i;
import React, { useEffect, useState } from "react";

const useSavedSummeries = function () {
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
  }, []);

  return {
    summaries,
    setSummaries,
    handleDelete,
    fetchSummaries,
  };
};

export default useSavedSummeries;
