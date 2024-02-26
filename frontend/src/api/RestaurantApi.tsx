import { RestaurantSearchResponse } from "@/types";
import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const useSearchRestaurant = (city?: string) => {
  return useQuery<RestaurantSearchResponse, Error>(
    ["get-restaurants-by-city", city],
    async () => {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/restaurant/search/${city}`
      );
      return data;
    },
    {
      enabled: !!city,
    }
  );
};
