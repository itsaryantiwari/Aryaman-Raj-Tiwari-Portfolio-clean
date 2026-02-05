import { createContext, Dispatch, SetStateAction, useContext } from "react";

type LoadingContextValue = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<number>>;
};

export const LoadingContext = createContext<LoadingContextValue | null>(null);

export const useLoading = (): LoadingContextValue => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
