import React, { useEffect, useState } from "react";
import useApi from "./useApi";

function useSearch() {
  const [Results, updateResults] = useState([]);
  const { Request, ResponseData, isLoading } = useApi();
  const Search = (query) => {
    Request(
      "user/?name=" + query,
      "GET",
      {},
      { "Content-type": "application/json" }
    );
  };
  useEffect(() => {
    if (ResponseData.length !== 0) {
      updateResults(ResponseData);
    }
  }, [ResponseData]);
  return {
    Search,
    Results,
    isLoading,
  };
}

export default useSearch;
