import {
  Context,
  createContext,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { setProvidersDispatch, setProvidersSearchDispatch } from "store/action";
import { appReducer, initialState } from "store/reducer";
import { IAppProviderProps, IProvider, IProvidersSearch } from "store/types";

const initialAppProviderValue = {
  ...initialState,
  setProviders: (providers: IProvider[]) => {},
  setProvidersSearch: (providersSearch: IProvidersSearch) => {},
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

  /**
   *
   * App provider value
   *
   */
  const value: IAppProviderProps = {
    ...state,
    setProviders,
    setProvidersSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
