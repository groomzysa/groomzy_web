import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Provider, QueryProvidersArgs } from "api/generated/graphqlTypes";
import {
  setProvidersDispatch,
  setProvidersSearchDispatch,
  setSignedInUserDispatch,
} from "store/action";
import { appReducer, initialState } from "store/reducer";
import { IAppProviderProps, IUser } from "store/types";

const initialAppProviderValue = {
  ...initialState,
  setProviders: (_: Provider[]) => {},
  setProvidersSearch: (_: QueryProvidersArgs) => {},
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
  const setProviders = (providers: Provider[]) => {
    setProvidersDispatch(dispatch, state.providers.concat(providers));
  };

  const setProvidersSearch = (providersSearch: QueryProvidersArgs) => {
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
