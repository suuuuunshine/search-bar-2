import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

export const useFetch = <T = unknown,>(url: string): FetchState<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, data };
};
