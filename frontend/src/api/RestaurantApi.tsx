import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useGetRestaurant = (restaurantId?: string) => {
  return useQuery<Restaurant, Error>(
    ["fetch-restaurant", restaurantId],
    async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/restaurant/${restaurantId}`
      );
      return data;
    },
    {
      enabled: !!restaurantId,
    }
  );
};

export const useSearchRestaurant = (
  searchState: SearchState,
  city?: string
) => {
  const params = new URLSearchParams();

  params.set("searchQuery", searchState.searchQuery);
  params.set("page", searchState.page.toString());
  params.set("selectedCuisines", searchState.selectedCuisines.join(","));
  params.set("sortOption", searchState.sortOption);

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
