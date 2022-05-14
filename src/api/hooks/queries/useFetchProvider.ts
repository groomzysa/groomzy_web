import { PROVIDER_QUERY } from "api/graphql/queries";
import request from "graphql-request";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import { IUser, Role } from "store/types";

export const useFetchProvider = (token: string, signedInUser: IUser) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;
  let enabled: boolean = false;

  if (token) {
    const role = jwt_decode<{ id: number; role: Role }>(token).role;
    if (!signedInUser && role === Role.Provider) {
      enabled = true;
    } else {
      enabled = false;
    }
  } else {
    enabled = false;
  }

  const fetchProvider = async () => {
    return await request(endpoint, PROVIDER_QUERY, undefined, {
      authorization: `Bearer ${token}`,
    });
  };

  const { data, isLoading, error } = useQuery<{ provider: IUser }>(
    "provider",
    fetchProvider,
    { enabled: enabled }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { provider: data?.provider, isLoading, errorMessage };
};
