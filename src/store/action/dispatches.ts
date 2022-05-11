import { Dispatch } from "react";
import { IAction, IProvider, IProvidersSearch, IUser } from "store/types";
import {
  SET_PROVIDERS,
  SET_SIGNEDIN_USER,
  SET_PROVIDERS_SEARCH,
} from "./actionTypes";

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
    type: SET_PROVIDERS_SEARCH,
    payload: {
      providersSearch,
    },
  });
};

export const setSignedInUserDispatch = (
  dispatch: Dispatch<IAction>,
  signedInUser: IUser
) => {
  dispatch({
    type: SET_SIGNEDIN_USER,
    payload: {
      signedInUser,
    },
  });
};
