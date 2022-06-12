import { Provider, QueryProvidersArgs } from "api/generated/graphqlTypes";
import { IAppState, IUser } from "store/types";

export const setProvidersAction = (state: IAppState, providers: Provider[]) => {
  return {
    ...state,
    providers,
  };
};

export const setProvidersSearchAction = (
  state: IAppState,
  providersSearch: QueryProvidersArgs
) => {
  return {
    ...state,
    providersSearch,
  };
};

export const setSignedInUserAction = (
  state: IAppState,
  signedInUser: IUser
) => {
  return {
    ...state,
    signedInUser,
  };
};
