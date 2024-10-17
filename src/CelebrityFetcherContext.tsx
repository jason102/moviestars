import { createContext, useState, Dispatch, SetStateAction } from "react";

type Celebrity = {
  name: string;
};

interface CelebrityFetcherContextType {
  celebrities: Celebrity[];
  setCelebrities: Dispatch<SetStateAction<Celebrity[]>>;
}

export const CelebrityFetcherContext =
  createContext<CelebrityFetcherContextType>({
    celebrities: [],
    setCelebrities: () => {},
  });

interface Props {
  children?: React.ReactNode;
}

const CelebrityFetcherProvider: React.FC<Props> = ({ children }) => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);

  return (
    <CelebrityFetcherContext.Provider value={{ celebrities, setCelebrities }}>
      {children}
    </CelebrityFetcherContext.Provider>
  );
};

export default CelebrityFetcherProvider;
