import useSWR from "swr";
import axios from "axios";

// Function to fetch data using SWR and Axios
const fetchData = async (url) => {
  const response = await axios.get(url);
  return response.data.response;
};

// Custom hook to use SWR for data fetching
export const useApiService = (url) => {
  const { data, error, mutate } = useSWR(url, fetchData, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading: !data && !error,
    mutate,
  };
};
