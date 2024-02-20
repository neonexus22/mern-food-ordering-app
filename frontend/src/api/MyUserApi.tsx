import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async ({ auth0Id, email }: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    return axios.post(
      `${API_BASE_URL}/api/my/user`,
      { auth0Id, email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    return axios.put(`${API_BASE_URL}/api/my/user`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
};

export { useCreateMyUser, useUpdateMyUser };
