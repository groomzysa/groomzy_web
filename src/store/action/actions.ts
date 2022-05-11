import { IAppState, IProvider, IProvidersSearch, IUser } from "store/types";

export const setProvidersAction = (
  state: IAppState,
  providers: IProvider[]
) => {
  return {
    ...state,
    providers,
  };
};

export const setProvidersSearchAction = (
  state: IAppState,
  providersSearch: IProvidersSearch
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
