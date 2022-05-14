import { PROVIDERS_QUERY } from "api/graphql/queries";
import request from "graphql-request";
import { useQuery } from "react-query";
import { IProvider } from "store/types";
import { IUseFetchProviders } from "./types";

export const useFetchProviders = ({ variables }: IUseFetchProviders) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("No API endpoint defined");
  }

  const endpoint: string = process.env.REACT_APP_API_URL;

  const fetchProviders = async () => {
    return await request(endpoint, PROVIDERS_QUERY, variables);
  };

  const { data, isLoading, error } = useQuery<{ providers: IProvider[] }>(
    "providers",
    fetchProviders
  );

  //@ts-ignore
  const errorMessage = error?.response?.errors?.[0]?.message;

  return { providers: data?.providers || [], isLoading, errorMessage };
};
