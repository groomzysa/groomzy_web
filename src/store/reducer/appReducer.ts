import {
  setProvidersAction,
  setProvidersSearchAction,
  setSignedInUserAction,
  SET_PROVIDERS,
  SET_PROVIDERS_SEARCH,
  SET_SIGNEDIN_USER,
} from "store/action";
import { IAction, IAppState } from "store/types";

export const initialState: IAppState = {
  providers: [],
  providersSearch: {},
  signedInUser: undefined,
};

export const appReducer = (state: IAppState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROVIDERS:
      return setProvidersAction(state, payload.providers);
    case SET_PROVIDERS_SEARCH:
      return setProvidersSearchAction(state, payload.providersSearch);
    case SET_SIGNEDIN_USER:
      return setSignedInUserAction(state, payload.signedInUser);
    default:
      return state;
  }
};
