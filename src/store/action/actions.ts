import { IAppState, IProvider, IProvidersSearch } from "store/types";

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
