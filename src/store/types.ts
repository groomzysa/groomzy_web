/**
 *
 * Enums
 *
 */
export enum BookingStatus {
  Active = "Active",
  Pending = "Pending",
  Done = "Done",
  Cancelled = "Cancelled",
  Deleted = "Deleted",
}

export enum Duration {
  Min = "min",
  Hour = "hrz",
}

export enum Role {
  Provider = "Provider",
  Client = "Client",
}
/**
 *
 * Interfaces
 *
 */
export interface IAppState {
  providers: IProvider[];
  providersSearch: IProvidersSearch;
  signedInUser?: IUser;
}

export interface IAppProviderProps extends IAppState {
  setProviders: (providers: IProvider[]) => void;
  setProvidersSearch: (providersSearch: IProvidersSearch) => void;
  setSignedInUser: (signedInUser: IUser) => void;
}

export interface IProvidersSearch {
  search?: string;
  category?: string;
}

export interface IAction {
  type: string;
  payload: {
    [key: string]: any;
  };
}

export interface IProvider {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: IAddress;
  dayTimes: IDayTime;
  bookings: IBooking[];
  serviceProviderCategories: IServiceProviderCategories[];
  staffs: IStaff[];
}

export interface IClient {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: IAddress;
  bookings: IBooking[];
}

export interface IAddress {
  id?: number;
  streetNumber?: string;
  streetName?: string;
  suburbName?: string;
  cityName?: string;
  provinceName?: string;
  areaCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface IDayTime {
  id: number;
  day: IDay;
  time: ITime;
}

export interface IDay {
  id: number;
  day: string;
}

export interface ITime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface IBooking {
  id: number;
  bookingTime: string;
  status: BookingStatus;
  inHouse: boolean;
  createdAt: string;
  rating: IRating;
  service: IService;
  staff: IStaff;
  client: IClient;
}

export interface IRating {
  id: number;
  rate: number;
  comment: string;
}

export interface IService {
  id: number;
  description: string;
  duration: number;
  durationUnit: Duration;
  inHouse: boolean;
  price: number;
  title: string;
}

export interface IStaff {
  id: number;
  fullName: string;
}

export interface ICategory {
  id: number;
  category: string;
}

export interface IServiceProviderCategories {
  category: ICategory;
  service: IService;
}

export interface ISignInClient extends IClient {
  token: string;
  role: Role;
}

export interface ISignInProvider extends IProvider {
  token: string;
  role: Role;
}

export interface IMessage {
  message: string;
}

/**
 *
 * Types
 *
 */

export type IUser = IClient | IProvider | undefined;
