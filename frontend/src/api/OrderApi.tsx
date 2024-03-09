import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const {
    mutate: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(async (checkoutSessionRequest: CheckoutSessionRequest) => {
    const accessToken = await getAccessTokenSilently();
    const { data } = await axios.post(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      { ...checkoutSessionRequest },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  });
  if (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error?.response?.data?.message ||
          error.toString() ||
          "Failed to checkout"
      );
    }
    reset();
  }
  return { createCheckoutSession, isLoading };
};
