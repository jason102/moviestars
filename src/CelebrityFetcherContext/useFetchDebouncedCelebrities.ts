import { useState, useEffect, useCallback } from "react";
import { TheMoveDBApiResponse, Celebrity } from "../types";

const getFetchUrl = (query: string) => {
  if (query) {
    return `https://api.themoviedb.org/3/search/person?api_key=${
      import.meta.env.VITE_THE_MOVIE_DB_API_KEY
    }&query=${query}`;
  }

  return `https://api.themoviedb.org/3/person/popular?api_key=${
    import.meta.env.VITE_THE_MOVIE_DB_API_KEY
  }`;
};

export const useFetchDebouncedCelebrities = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const fetchCelebrities = useCallback(async () => {
    setLoading(true);
    setError("");
    console.log("SEARCHING for " + debouncedQuery);
    try {
      const response = await fetch(getFetchUrl(debouncedQuery));
      if (!response.ok) {
        throw new Error(`Ooops, something went wrong: ${response.statusText}`);
      }
      const apiData: TheMoveDBApiResponse = await response.json();
      console.log(apiData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery]);

  // Debounce timer
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  // Fetch celebrities on load and when debouncedQuery updates
  useEffect(() => {
    fetchCelebrities();
  }, [debouncedQuery, fetchCelebrities]);

  return { celebrities, loading, error, query, setQuery };
};
