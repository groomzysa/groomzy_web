import {
  setProvidersAction,
  setProvidersSearchAction,
  SET_PROVIDERS,
  SET_PROVIDERS_SEARCH,
} from "store/action";
import { IAction, IAppState } from "store/types";

export const initialState: IAppState = {
  providers: [],
  providersSearch: {},
};

export const appReducer = (state: IAppState, action: IAction) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROVIDERS:
      return setProvidersAction(state, payload.providers);
    case SET_PROVIDERS_SEARCH:
      return setProvidersSearchAction(state, payload.providersSearch);
    default:
      return state;
  }
};
