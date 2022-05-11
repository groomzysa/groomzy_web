import { CLIENT_QUERY } from "api/graphql/queries";
import request from "graphql-request";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import { IUser, Role } from "store/types";

export const useFetchClient = (token: string, signedInUser: IUser) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;
  let enabled: boolean = false;

  if (token) {
    const role = jwt_decode<{ id: number; role: Role }>(token).role;
    if (!signedInUser && role === Role.Client) {
      enabled = true;
    } else {
      enabled = false;
    }
  } else {
    enabled = false;
  }

  const fetchClient = async () => {
    const client = await request(endpoint, CLIENT_QUERY, undefined, {
      authorization: `Bearer ${token}`,
    });

    return client;
  };

  const { data, isLoading, error } = useQuery<{ client: IUser }>(
    "client",
    fetchClient,
    { enabled: enabled }
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { client: data?.client, isLoading, errorMessage };
};
