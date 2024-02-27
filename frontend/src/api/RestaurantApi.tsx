import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const params = new URLSearchParams();

  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));

  return useQuery<RestaurantSearchResponse, Error>(
    ["get-restaurants-by-city", city, searchState],
    async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
      );
      return data;
    },
    {
      enabled: !!city,
    }
  );
};
