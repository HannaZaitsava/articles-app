// A custom hook that shows an animation during exeqution of a long running operation
import { useState } from "react";
export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true); // start showing data loading indicator
      await callback(...args);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false); // stop showing data loading indicator
    }
  };

  return [fetching, isLoading, error];
};
