import { useState, useEffect, useCallback, useRef } from "react";
import { TheMoveDBApiResponse, Celebrity } from "../types";
import { THE_MOVIE_DB_DOMAIN_URL } from "../utils";

const getFetchUrl = (query: string, page: number) => {
  if (query) {
    return `${THE_MOVIE_DB_DOMAIN_URL}search/person?api_key=${
      import.meta.env.VITE_THE_MOVIE_DB_API_KEY
    }&query=${query}&page=${page}`;
  }

  return `${THE_MOVIE_DB_DOMAIN_URL}person/popular?api_key=${
    import.meta.env.VITE_THE_MOVIE_DB_API_KEY
  }&page=${page}`;
};

export const useFetchDebouncedCelebrities = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState(""); // Whatever the user has typed into the search text box
  const [debouncedQuery, setDebouncedQuery] = useState(""); // The final query we should send to the API
  const [hasMorePages, setHasMorePages] = useState(true); // Know if The Movie DB has more pages of content for pagination
  const pageRef = useRef(1); // Track which page we should fetch next for pagination

  const fetchCelebrities = useCallback(
    async (resetPage = false) => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          getFetchUrl(debouncedQuery, pageRef.current)
        );

        if (!response.ok) {
          throw new Error(
            `Ooops, something went wrong: ${response.statusText}`
          );
        }

        const apiData: TheMoveDBApiResponse = await response.json();

        if (resetPage) {
          setCelebrities(apiData.results);
        } else {
          setCelebrities((previousCelebrities) => [
            ...previousCelebrities,
            ...apiData.results,
          ]);
        }

        setHasMorePages(pageRef.current < apiData.total_pages);
      } catch (err) {
        const typedError = err as Error;
        setError(typedError.message);
      } finally {
        setLoading(false);
      }
    },
    [debouncedQuery]
  );

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
    // Reset to page 1 when the query changes
    pageRef.current = 1;
    setCelebrities([]);

    fetchCelebrities(true);
  }, [debouncedQuery, fetchCelebrities]);

  // Load the next page of results when the user reaches the bottom of the page
  const loadMoreCelebrities = () => {
    if (!loading && hasMorePages) {
      // Then fetch the next page
      pageRef.current += 1;
      fetchCelebrities();
    }
  };

  return { celebrities, loading, error, query, setQuery, loadMoreCelebrities };
};
