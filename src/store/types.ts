import {
  Client,
  Provider,
  QueryProvidersArgs,
} from "api/generated/graphqlTypes";

/**
 *
 * Enums
 *
 */
export enum Duration {
  Min = "min",
  Hour = "hrz",
}

export enum Role {
  Provider = "Provider",
  Client = "Client",
}

export enum Category {
  Barber = "Barber",
  MakeupArtist = "Makeup Artist",
  NailTechnician = "Nail Technician",
  Hairdresser = "Hairdresser",
  Spa = "Spa",
}

/**
 *
 * Interfaces
 *
 */
export interface IAppState {
  providers: Provider[];
  providersSearch: QueryProvidersArgs;
  signedInUser?: IUser;
}

export interface IAppProviderProps extends IAppState {
  setProviders: (providers: Provider[]) => void;
  setProvidersSearch: (providersSearch: QueryProvidersArgs) => void;
  setSignedInUser: (signedInUser: IUser) => void;
}
export interface IAction {
  type: string;
  payload: {
    [key: string]: any;
  };
}
export interface ISignInClient extends Client {
  token: string;
  role: Role;
}

export interface ISignInProvider extends Provider {
  token: string;
  role: Role;
}

export interface IMessage {
  message: string;
}

export interface ISelectOption {
  id: number;
  value: string;
  label: string;
}

/**
 *
 * Types
 *
 */

export type IUser = Client | Provider | undefined;
