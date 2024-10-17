import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { TheMoveDBApiResponse, Celebrity } from "./types";

interface CelebrityFetcherContextType {
  celebrities: Celebrity[];
  setCelebrities: Dispatch<SetStateAction<Celebrity[]>>;
  loading: boolean;
  error: string;
}

export const CelebrityFetcherContext =
  createContext<CelebrityFetcherContextType>({
    celebrities: [],
    setCelebrities: () => {},
    loading: true,
    error: "",
  });

interface Props {
  children?: React.ReactNode;
}

const CelebrityFetcherProvider: React.FC<Props> = ({ children }) => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCelebrities = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${
          import.meta.env.VITE_THE_MOVIE_DB_API_KEY
        }`
      );

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
  };

  // Load some celebrities when the app first loads
  useEffect(() => {
    fetchCelebrities();
  }, []);

  return (
    <CelebrityFetcherContext.Provider
      value={{ celebrities, setCelebrities, loading, error }}
    >
      {children}
    </CelebrityFetcherContext.Provider>
  );
};

export default CelebrityFetcherProvider;
