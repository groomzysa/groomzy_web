import { Dispatch } from "react";
import { IAction, IProvider, IProvidersSearch } from "store/types";
import { SET_PROVIDERS } from "./actionTypes";

export const setProvidersDispatch = (
  dispatch: Dispatch<IAction>,
  providers: IProvider[]
) => {
  dispatch({
    type: SET_PROVIDERS,
    payload: {
      providers,
    },
  });
};

export const setProvidersSearchDispatch = (
  dispatch: Dispatch<IAction>,
  providersSearch: IProvidersSearch
) => {
  dispatch({
    type: SET_PROVIDERS,
    payload: {
      providersSearch,
    },
  });
};
