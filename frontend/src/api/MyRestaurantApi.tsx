import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();
    return axios.post<AxiosResponse<Restaurant>, Error>(
      `${API_BASE_URL}/api/my/restaurant`,
      restaurantFormData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
  if (isSuccess) {
    toast.success("Restaurant created successfully");
  }
  if (error) {
    toast.error(error.toString() || "Failed to create restaurant");
    reset();
  }
  return { createRestaurant, isLoading };
};

export { useCreateMyRestaurant };
