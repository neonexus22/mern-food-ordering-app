import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery<Restaurant, Error>("get-my-restaurant", async () => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.get(`${API_BASE_URL}/api/my/restaurant`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  });
};

const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
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
    console.log({ error });
    if (axios.isAxiosError(error)) {
      toast.error(
        error?.response?.data?.message ||
          error.toString() ||
          "Failed to create restaurant"
      );
    }
  }
  return { createRestaurant, isLoading };
};

const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: updateRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(async (restaurantFormData: FormData) => {
    const accessToken = await getAccessTokenSilently();
    return axios.put(`${API_BASE_URL}/api/my/restaurant`, restaurantFormData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
  if (isSuccess) {
    toast.success("Restaurant updated successfully!");
  }
  if (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      toast.error(
        error?.response?.data.message ||
          error.toString() ||
          "Error updating restaurant"
      );
    }
  }
  return { updateRestaurant, isLoading };
};

export { useGetMyRestaurant, useCreateMyRestaurant, useUpdateMyRestaurant };
