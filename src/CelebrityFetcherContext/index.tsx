import { createContext, Dispatch, SetStateAction } from "react";
import { Celebrity } from "../types";
import { useFetchDebouncedCelebrities } from "./useFetchDebouncedCelebrities";

interface CelebrityFetcherContextType {
  celebrities: Celebrity[];
  loading: boolean;
  error: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  loadMoreCelebrities: VoidFunction;
  fetchCelebrities: VoidFunction;
}

export const CelebrityFetcherContext =
  createContext<CelebrityFetcherContextType>({
    celebrities: [],
    loading: true,
    error: "",
    query: "",
    setQuery: () => {},
    loadMoreCelebrities: () => {},
    fetchCelebrities: () => {},
  });

interface Props {
  children?: React.ReactNode;
}

const CelebrityFetcherProvider: React.FC<Props> = ({ children }) => {
  const {
    celebrities,
    loading,
    error,
    query,
    setQuery,
    loadMoreCelebrities,
    fetchCelebrities,
  } = useFetchDebouncedCelebrities();

  return (
    <CelebrityFetcherContext.Provider
      value={{
        celebrities,
        loading,
        error,
        query,
        setQuery,
        loadMoreCelebrities,
        fetchCelebrities,
      }}
    >
      {children}
    </CelebrityFetcherContext.Provider>
  );
};

export default CelebrityFetcherProvider;
