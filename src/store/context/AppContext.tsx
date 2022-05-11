import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {
  setProvidersDispatch,
  setProvidersSearchDispatch,
  setSignedInUserDispatch,
} from "store/action";
import { appReducer, initialState } from "store/reducer";
import {
  IAppProviderProps,
  IProvider,
  IProvidersSearch,
  IUser,
} from "store/types";

const initialAppProviderValue = {
  ...initialState,
  setProviders: (_: IProvider[]) => {},
  setProvidersSearch: (_: IProvidersSearch) => {},
  setSignedInUser: (_?: IUser) => {},
};

const AppContext: Context<IAppProviderProps> = createContext(
  initialAppProviderValue
);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /**
   *
   * Dispatches
   *
   */
  const setProviders = (providers: IProvider[]) => {
    setProvidersDispatch(dispatch, state.providers.concat(providers));
  };

  const setProvidersSearch = (providersSearch: IProvidersSearch) => {
    setProvidersSearchDispatch(dispatch, providersSearch);
  };

  const setSignedInUser = (signedInUser: IUser) => {
    setSignedInUserDispatch(dispatch, signedInUser);
  };

  /**
   *
   * App provider value
   *
   */
  const value: IAppProviderProps = {
    ...state,
    setProviders,
    setProvidersSearch,
    setSignedInUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
