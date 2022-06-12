import { GraphQLClient } from "graphql-request";
import { getToken } from "utils/auth";

export const graphqlRequestClient = () => {
  const requestHeaders = {
    authorization: `Bearer ${getToken()}`,
  };

  return new GraphQLClient(process.env.REACT_APP_API_URL as string, {
    headers: requestHeaders,
  });
};
