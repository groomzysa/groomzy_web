/************************************
 * GENERATED TYPES FILE DO NOT EDIT *
************************************/

import type { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, type UseMutationOptions, type UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  File: any;
};

export type Address = {
  __typename?: 'Address';
  areaCode: Scalars['String'];
  cityName: Scalars['String'];
  id: Scalars['Int'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  provinceName: Scalars['String'];
  streetName: Scalars['String'];
  streetNumber: Scalars['String'];
  suburbName: Scalars['String'];
};

export type Booking = {
  __typename?: 'Booking';
  bookingTime: Scalars['String'];
  client: Client;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  inHouse: Scalars['Boolean'];
  provider?: Maybe<Provider>;
  rating?: Maybe<Rating>;
  service: Service;
  staff: Staff;
  status: BookingStatus;
  transportCost?: Maybe<TransportCost>;
};

export enum BookingStatus {
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
  DELETED = 'Deleted',
  DONE = 'Done',
  PENDING = 'Pending'
}

export enum BusinessDay {
  FRI = 'Fri',
  MON = 'Mon',
  SAT = 'Sat',
  SUN = 'Sun',
  THU = 'Thu',
  TUE = 'Tue',
  WED = 'Wed'
}

export type Category = {
  __typename?: 'Category';
  category: Scalars['String'];
  id: Scalars['Int'];
};

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Address>;
  bookings?: Maybe<Array<Booking>>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['Int'];
  passwordReset?: Maybe<ClientPasswordReset>;
  phoneNumber?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type ClientPasswordReset = {
  __typename?: 'ClientPasswordReset';
  id: Scalars['Int'];
  oneTimePin: Scalars['Float'];
  resetTokenExpiry: Scalars['String'];
};

export type Day = {
  __typename?: 'Day';
  day?: Maybe<BusinessDay>;
  id: Scalars['Int'];
};

export type DayTime = {
  __typename?: 'DayTime';
  day: Day;
  id: Scalars['Int'];
  provider?: Maybe<Provider>;
  time: Time;
};

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addGallery: ProviderGalleryMessage;
  addOperatingTime: OperatingTimeMessage;
  addProviderProfile: ProviderProfileMessage;
  addService: ServiceMessage;
  addSocial: ProviderSocialMessage;
  addStaff: StaffMessage;
  clientBook: Booking;
  clientBookingCancel: Message;
  clientBookingComplete: Message;
  clientBookingDelete: Message;
  clientBookingRate: Message;
  deleteGallery: ProviderGalleryMessage;
  deleteOperatingTime: OperatingTimeMessage;
  deleteService: ServiceMessage;
  deleteSocial: ProviderSocialMessage;
  deleteStaff: StaffMessage;
  editOperatingTime: OperatingTimeMessage;
  editProfile: ProfileMessage;
  editService: ServiceMessage;
  editSocial: ProviderSocialMessage;
  editStaff: StaffMessage;
  providerBookingCancel: Message;
  providerBookingDone: Message;
  requestResetPassword: Message;
  resetPassword: Message;
  sendMail: Message;
  signinClient: Client;
  signinProvider: Provider;
  signupClient: Message;
  signupProvider: Message;
};


export type MutationAddGalleryArgs = {
  galleryImageFile: Scalars['File'];
  name: Scalars['String'];
};


export type MutationAddOperatingTimeArgs = {
  day: Scalars['String'];
  endTime: Scalars['String'];
  startTime: Scalars['String'];
};


export type MutationAddProviderProfileArgs = {
  tradingAreaCode: Scalars['String'];
  tradingCityName: Scalars['String'];
  tradingLatitude?: InputMaybe<Scalars['Float']>;
  tradingLongitude?: InputMaybe<Scalars['Float']>;
  tradingName: Scalars['String'];
  tradingProfileImage?: InputMaybe<Scalars['File']>;
  tradingProvinceName: Scalars['String'];
  tradingStreetName: Scalars['String'];
  tradingStreetNumber: Scalars['String'];
  tradingSuburbName: Scalars['String'];
};


export type MutationAddServiceArgs = {
  category: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['Float'];
  durationUnit: Scalars['String'];
  inHouse: Scalars['Boolean'];
  price: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationAddSocialArgs = {
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationAddStaffArgs = {
  fullName: Scalars['String'];
};


export type MutationClientBookArgs = {
  address?: InputMaybe<Scalars['String']>;
  bookingDate: Scalars['String'];
  bookingTime: Scalars['String'];
  inHouse: Scalars['Boolean'];
  providerId: Scalars['Int'];
  serviceId: Scalars['Int'];
  staffId: Scalars['Int'];
};


export type MutationClientBookingCancelArgs = {
  bookingId: Scalars['Int'];
  cancel: Scalars['Boolean'];
};


export type MutationClientBookingCompleteArgs = {
  bookingId: Scalars['Int'];
  complete: Scalars['Boolean'];
};


export type MutationClientBookingDeleteArgs = {
  bookingId: Scalars['Int'];
  delete: Scalars['Boolean'];
};


export type MutationClientBookingRateArgs = {
  bookingId: Scalars['Int'];
  comment?: InputMaybe<Scalars['String']>;
  rate: Scalars['Float'];
  ratingId?: InputMaybe<Scalars['Int']>;
};


export type MutationDeleteGalleryArgs = {
  fileName: Scalars['String'];
  galleryId: Scalars['Int'];
};


export type MutationDeleteOperatingTimeArgs = {
  dayTimeId: Scalars['Int'];
};


export type MutationDeleteServiceArgs = {
  categoryId: Scalars['Int'];
  serviceId: Scalars['Int'];
};


export type MutationDeleteSocialArgs = {
  socialId: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  staffId: Scalars['Int'];
};


export type MutationEditOperatingTimeArgs = {
  day: Scalars['String'];
  dayTimeId: Scalars['Int'];
  endTime?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['String']>;
};


export type MutationEditProfileArgs = {
  areaCode?: InputMaybe<Scalars['String']>;
  cityName?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  profileImage?: InputMaybe<Scalars['File']>;
  provinceName?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  suburbName?: InputMaybe<Scalars['String']>;
};


export type MutationEditServiceArgs = {
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  durationUnit?: InputMaybe<Scalars['String']>;
  inHouse?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
  serviceId: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationEditSocialArgs = {
  name?: InputMaybe<Scalars['String']>;
  socialId: Scalars['Int'];
  url?: InputMaybe<Scalars['String']>;
};


export type MutationEditStaffArgs = {
  fullName?: InputMaybe<Scalars['String']>;
  staffId: Scalars['Int'];
};


export type MutationProviderBookingCancelArgs = {
  bookingId: Scalars['Int'];
  cancel: Scalars['Boolean'];
};


export type MutationProviderBookingDoneArgs = {
  bookingId: Scalars['Int'];
  done: Scalars['Boolean'];
};


export type MutationRequestResetPasswordArgs = {
  email: Scalars['String'];
  isProvider: Scalars['Boolean'];
};


export type MutationResetPasswordArgs = {
  isProvider: Scalars['Boolean'];
  oneTimePin: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSendMailArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  message: Scalars['String'];
  subject: Scalars['String'];
};


export type MutationSigninClientArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  verify?: InputMaybe<Scalars['String']>;
};


export type MutationSigninProviderArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  verify?: InputMaybe<Scalars['String']>;
};


export type MutationSignupClientArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationSignupProviderArgs = {
  email: Scalars['String'];
  fullName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type OperatingTimeMessage = {
  __typename?: 'OperatingTimeMessage';
  message: Message;
  operatingTime: DayTime;
};

export type ProfileMessage = {
  __typename?: 'ProfileMessage';
  client?: Maybe<Client>;
  message: Message;
  provider?: Maybe<Provider>;
};

export type Provider = {
  __typename?: 'Provider';
  address?: Maybe<Address>;
  bookings?: Maybe<Array<Booking>>;
  dayTimes?: Maybe<Array<DayTime>>;
  email: Scalars['String'];
  fullName: Scalars['String'];
  gallery?: Maybe<Array<ProviderGallery>>;
  id: Scalars['Int'];
  passwordReset?: Maybe<ProviderPasswordReset>;
  phoneNumber?: Maybe<Scalars['String']>;
  profile?: Maybe<ProviderProfile>;
  profileImageUrl?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  serviceProviderCategories?: Maybe<Array<ServiceProviderCategory>>;
  socials?: Maybe<Array<ProviderSocial>>;
  staffs?: Maybe<Array<Staff>>;
  token?: Maybe<Scalars['String']>;
};

export type ProviderGallery = {
  __typename?: 'ProviderGallery';
  fileName: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ProviderGalleryMessage = {
  __typename?: 'ProviderGalleryMessage';
  gallery: ProviderGallery;
  message: Message;
};

export type ProviderPasswordReset = {
  __typename?: 'ProviderPasswordReset';
  id: Scalars['Int'];
  oneTimePin: Scalars['Float'];
  resetTokenExpiry: Scalars['String'];
};

export type ProviderProfile = {
  __typename?: 'ProviderProfile';
  id: Scalars['Int'];
  tradingAreaCode: Scalars['String'];
  tradingCityName: Scalars['String'];
  tradingLatitude?: Maybe<Scalars['Float']>;
  tradingLongitude?: Maybe<Scalars['Float']>;
  tradingName: Scalars['String'];
  tradingProfileImageUrl?: Maybe<Scalars['String']>;
  tradingProvinceName: Scalars['String'];
  tradingStreetName?: Maybe<Scalars['String']>;
  tradingStreetNumber?: Maybe<Scalars['String']>;
  tradingSuburbName: Scalars['String'];
};

export type ProviderProfileMessage = {
  __typename?: 'ProviderProfileMessage';
  message: Message;
  profile: ProviderProfile;
};

export type ProviderSocial = {
  __typename?: 'ProviderSocial';
  id: Scalars['Int'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ProviderSocialMessage = {
  __typename?: 'ProviderSocialMessage';
  message: Message;
  social: ProviderSocial;
};

export type Query = {
  __typename?: 'Query';
  client?: Maybe<Client>;
  clientBookings: Client;
  clients: Array<Client>;
  gallery: ProviderGallery;
  operatingTime: DayTime;
  provider?: Maybe<Provider>;
  providerBookings: Provider;
  providerGallery?: Maybe<Array<ProviderGallery>>;
  providerOperatingTimes: Array<DayTime>;
  providerProfile?: Maybe<ProviderProfile>;
  providerRatings: Provider;
  providerServices: Array<Service>;
  providerSocials?: Maybe<Array<ProviderSocial>>;
  providerStaffs: Array<Staff>;
  providers: Array<Provider>;
  service: Service;
  social: ProviderSocial;
  staff: Staff;
};


export type QueryClientBookingsArgs = {
  clientId: Scalars['Int'];
};


export type QueryGalleryArgs = {
  id: Scalars['Int'];
};


export type QueryOperatingTimeArgs = {
  id: Scalars['Int'];
};


export type QueryProviderBookingsArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderGalleryArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderOperatingTimesArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderProfileArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderRatingsArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderServicesArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderSocialsArgs = {
  providerId: Scalars['Int'];
};


export type QueryProviderStaffsArgs = {
  providerId: Scalars['Int'];
};


export type QueryProvidersArgs = {
  category?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryServiceArgs = {
  id: Scalars['Int'];
};


export type QuerySocialArgs = {
  id: Scalars['Int'];
};


export type QueryStaffArgs = {
  id: Scalars['Int'];
};

export type Rating = {
  __typename?: 'Rating';
  comment?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  rate: Scalars['Float'];
};

export type Service = {
  __typename?: 'Service';
  description: Scalars['String'];
  duration: Scalars['Float'];
  durationUnit: Scalars['String'];
  id: Scalars['Int'];
  inHouse: Scalars['Boolean'];
  price: Scalars['Float'];
  serviceProviderCategories?: Maybe<Array<ServiceProviderCategory>>;
  staff?: Maybe<Staff>;
  title: Scalars['String'];
};

export type ServiceMessage = {
  __typename?: 'ServiceMessage';
  message: Message;
  service: Service;
};

export type ServiceProviderCategory = {
  __typename?: 'ServiceProviderCategory';
  category?: Maybe<Category>;
  provider?: Maybe<Provider>;
  service?: Maybe<Service>;
};

export type Staff = {
  __typename?: 'Staff';
  bookings?: Maybe<Array<Booking>>;
  fullName: Scalars['String'];
  id: Scalars['Int'];
  provider?: Maybe<Provider>;
  services?: Maybe<Array<Service>>;
};

export type StaffMessage = {
  __typename?: 'StaffMessage';
  message: Message;
  staff: Staff;
};

export type Subscription = {
  __typename?: 'Subscription';
  bookingCancelled: BookingCancelledSubscription;
  bookingDone: BookingDoneSubscription;
  bookingMade: BookingMadeSubscription;
  bookingPaid: BookingPaidSubscription;
  bookingRateService: BookingRateServiceSubscription;
};


export type SubscriptionBookingCancelledArgs = {
  bookingId: Scalars['Int'];
};


export type SubscriptionBookingDoneArgs = {
  bookingId: Scalars['Int'];
};


export type SubscriptionBookingMadeArgs = {
  providerId: Scalars['Int'];
};


export type SubscriptionBookingPaidArgs = {
  bookingId: Scalars['Int'];
};


export type SubscriptionBookingRateServiceArgs = {
  bookingId: Scalars['Int'];
};

export type Time = {
  __typename?: 'Time';
  endTime: Scalars['String'];
  id: Scalars['Int'];
  startTime: Scalars['String'];
};

export type TransportCost = {
  __typename?: 'TransportCost';
  distance: Scalars['Float'];
  estimatedCost: Scalars['Float'];
  id: Scalars['Int'];
};

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending',
  SUSPENDED = 'Suspended'
}

export type BookingCancelledSubscription = {
  __typename?: 'bookingCancelledSubscription';
  id: Scalars['Int'];
  mutation: Scalars['String'];
};

export type BookingDoneSubscription = {
  __typename?: 'bookingDoneSubscription';
  id: Scalars['Int'];
  mutation: Scalars['String'];
};

export type BookingMadeSubscription = {
  __typename?: 'bookingMadeSubscription';
  bookingId: Scalars['Int'];
  id: Scalars['Int'];
  mutation: Scalars['String'];
};

export type BookingPaidSubscription = {
  __typename?: 'bookingPaidSubscription';
  id: Scalars['Int'];
  mutation: Scalars['String'];
};

export type BookingRateServiceSubscription = {
  __typename?: 'bookingRateServiceSubscription';
  id: Scalars['Int'];
  mutation: Scalars['String'];
};

export type AddProviderProfileMutationVariables = Exact<{
  tradingName: Scalars['String'];
  tradingStreetNumber: Scalars['String'];
  tradingStreetName: Scalars['String'];
  tradingSuburbName: Scalars['String'];
  tradingCityName: Scalars['String'];
  tradingProvinceName: Scalars['String'];
  tradingAreaCode: Scalars['String'];
  tradingLatitude?: InputMaybe<Scalars['Float']>;
  tradingLongitude?: InputMaybe<Scalars['Float']>;
  tradingProfileImage?: InputMaybe<Scalars['File']>;
}>;


export type AddProviderProfileMutationResult = { __typename?: 'Mutation', addProviderProfile: { __typename?: 'ProviderProfileMessage', message: { __typename?: 'Message', message: string }, profile: { __typename?: 'ProviderProfile', id: number, tradingName: string, tradingStreetNumber?: string | null, tradingStreetName?: string | null, tradingSuburbName: string, tradingCityName: string, tradingProvinceName: string, tradingAreaCode: string, tradingLatitude?: number | null, tradingLongitude?: number | null } } };

export type AddGalleryMutationVariables = Exact<{
  name: Scalars['String'];
  galleryImageFile: Scalars['File'];
}>;


export type AddGalleryMutationResult = { __typename?: 'Mutation', addGallery: { __typename?: 'ProviderGalleryMessage', message: { __typename?: 'Message', message: string }, gallery: { __typename?: 'ProviderGallery', id: number, fileName: string, name: string, url: string } } };

export type AddOperatingTimeMutationVariables = Exact<{
  day: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
}>;


export type AddOperatingTimeMutationResult = { __typename?: 'Mutation', addOperatingTime: { __typename?: 'OperatingTimeMessage', message: { __typename?: 'Message', message: string }, operatingTime: { __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } } } };

export type AddServiceMutationVariables = Exact<{
  category: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['Float'];
  durationUnit: Scalars['String'];
  price: Scalars['Float'];
  inHouse: Scalars['Boolean'];
}>;


export type AddServiceMutationResult = { __typename?: 'Mutation', addService: { __typename?: 'ServiceMessage', message: { __typename?: 'Message', message: string }, service: { __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null }> | null } } };

export type AddSocialMutationVariables = Exact<{
  name: Scalars['String'];
  url: Scalars['String'];
}>;


export type AddSocialMutationResult = { __typename?: 'Mutation', addSocial: { __typename?: 'ProviderSocialMessage', message: { __typename?: 'Message', message: string }, social: { __typename?: 'ProviderSocial', id: number, name: string, url: string } } };

export type AddStaffMutationVariables = Exact<{
  fullName: Scalars['String'];
}>;


export type AddStaffMutationResult = { __typename?: 'Mutation', addStaff: { __typename?: 'StaffMessage', message: { __typename?: 'Message', message: string }, staff: { __typename?: 'Staff', id: number, fullName: string } } };

export type DeleteGalleryMutationVariables = Exact<{
  galleryId: Scalars['Int'];
  fileName: Scalars['String'];
}>;


export type DeleteGalleryMutationResult = { __typename?: 'Mutation', deleteGallery: { __typename?: 'ProviderGalleryMessage', message: { __typename?: 'Message', message: string }, gallery: { __typename?: 'ProviderGallery', id: number, fileName: string, name: string, url: string } } };

export type DeleteOperatingTimeMutationVariables = Exact<{
  dayTimeId: Scalars['Int'];
}>;


export type DeleteOperatingTimeMutationResult = { __typename?: 'Mutation', deleteOperatingTime: { __typename?: 'OperatingTimeMessage', message: { __typename?: 'Message', message: string }, operatingTime: { __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } } } };

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
  categoryId: Scalars['Int'];
}>;


export type DeleteServiceMutationResult = { __typename?: 'Mutation', deleteService: { __typename?: 'ServiceMessage', message: { __typename?: 'Message', message: string }, service: { __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null }> | null } } };

export type DeleteSocialMutationVariables = Exact<{
  socialId: Scalars['Int'];
}>;


export type DeleteSocialMutationResult = { __typename?: 'Mutation', deleteSocial: { __typename?: 'ProviderSocialMessage', message: { __typename?: 'Message', message: string }, social: { __typename?: 'ProviderSocial', id: number, name: string, url: string } } };

export type DeleteStaffMutationVariables = Exact<{
  staffId: Scalars['Int'];
}>;


export type DeleteStaffMutationResult = { __typename?: 'Mutation', deleteStaff: { __typename?: 'StaffMessage', message: { __typename?: 'Message', message: string }, staff: { __typename?: 'Staff', id: number, fullName: string } } };

export type EditOperatingTimeMutationVariables = Exact<{
  dayTimeId: Scalars['Int'];
  day: Scalars['String'];
  startTime?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
}>;


export type EditOperatingTimeMutationResult = { __typename?: 'Mutation', editOperatingTime: { __typename?: 'OperatingTimeMessage', message: { __typename?: 'Message', message: string }, operatingTime: { __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } } } };

export type EditProfileMutationVariables = Exact<{
  fullName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  suburbName?: InputMaybe<Scalars['String']>;
  cityName?: InputMaybe<Scalars['String']>;
  provinceName?: InputMaybe<Scalars['String']>;
  areaCode?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  profileImage?: InputMaybe<Scalars['File']>;
}>;


export type EditProfileMutationResult = { __typename?: 'Mutation', editProfile: { __typename?: 'ProfileMessage', message: { __typename?: 'Message', message: string }, provider?: { __typename?: 'Provider', id: number, email: string, fullName: string, phoneNumber?: string | null, profileImageUrl?: string | null, token?: string | null, role?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } | null, client?: { __typename?: 'Client', id: number, email: string, fullName: string, phoneNumber?: string | null, profileImageUrl?: string | null, token?: string | null, role?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } | null } };

export type EditServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
  category?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  durationUnit?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  inHouse?: InputMaybe<Scalars['Boolean']>;
}>;


export type EditServiceMutationResult = { __typename?: 'Mutation', editService: { __typename?: 'ServiceMessage', message: { __typename?: 'Message', message: string }, service: { __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null }> | null } } };

export type EditSocialMutationVariables = Exact<{
  socialId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
}>;


export type EditSocialMutationResult = { __typename?: 'Mutation', editSocial: { __typename?: 'ProviderSocialMessage', message: { __typename?: 'Message', message: string }, social: { __typename?: 'ProviderSocial', id: number, name: string, url: string } } };

export type EditStaffMutationVariables = Exact<{
  staffId: Scalars['Int'];
  fullName?: InputMaybe<Scalars['String']>;
}>;


export type EditStaffMutationResult = { __typename?: 'Mutation', editStaff: { __typename?: 'StaffMessage', message: { __typename?: 'Message', message: string }, staff: { __typename?: 'Staff', id: number, fullName: string } } };

export type RequestResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  isProvider: Scalars['Boolean'];
}>;


export type RequestResetPasswordMutationResult = { __typename?: 'Mutation', requestResetPassword: { __typename?: 'Message', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  oneTimePin: Scalars['String'];
  password: Scalars['String'];
  isProvider: Scalars['Boolean'];
}>;


export type ResetPasswordMutationResult = { __typename?: 'Mutation', resetPassword: { __typename?: 'Message', message: string } };

export type SendMailMutationVariables = Exact<{
  fullName: Scalars['String'];
  subject: Scalars['String'];
  email: Scalars['String'];
  message: Scalars['String'];
}>;


export type SendMailMutationResult = { __typename?: 'Mutation', sendMail: { __typename?: 'Message', message: string } };

export type SigninClientMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninClientMutationResult = { __typename?: 'Mutation', signinClient: { __typename?: 'Client', id: number, email: string, fullName: string, phoneNumber?: string | null, profileImageUrl?: string | null, token?: string | null, role?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } };

export type SigninProviderMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninProviderMutationResult = { __typename?: 'Mutation', signinProvider: { __typename?: 'Provider', id: number, email: string, fullName: string, phoneNumber?: string | null, profileImageUrl?: string | null, token?: string | null, role?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } };

export type SignupClientMutationVariables = Exact<{
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type SignupClientMutationResult = { __typename?: 'Mutation', signupClient: { __typename?: 'Message', message: string } };

export type SignupProviderMutationVariables = Exact<{
  fullName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type SignupProviderMutationResult = { __typename?: 'Mutation', signupProvider: { __typename?: 'Message', message: string } };

export type ClientQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientQueryResult = { __typename?: 'Query', client?: { __typename?: 'Client', id: number, email: string, fullName: string, profileImageUrl?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } | null };

export type GalleryQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GalleryQueryResult = { __typename?: 'Query', gallery: { __typename?: 'ProviderGallery', id: number, fileName: string, name: string, url: string } };

export type OperatingTimeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type OperatingTimeQueryResult = { __typename?: 'Query', operatingTime: { __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } } };

export type ProviderGalleryQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderGalleryQueryResult = { __typename?: 'Query', providerGallery?: Array<{ __typename?: 'ProviderGallery', id: number, fileName: string, name: string, url: string }> | null };

export type ProviderOperatingTimesQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderOperatingTimesQueryResult = { __typename?: 'Query', providerOperatingTimes: Array<{ __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } }> };

export type ProviderProfileQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderProfileQueryResult = { __typename?: 'Query', providerProfile?: { __typename?: 'ProviderProfile', id: number, tradingName: string, tradingStreetNumber?: string | null, tradingStreetName?: string | null, tradingSuburbName: string, tradingCityName: string, tradingProvinceName: string, tradingAreaCode: string, tradingLatitude?: number | null, tradingLongitude?: number | null, tradingProfileImageUrl?: string | null } | null };

export type ProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type ProviderQueryResult = { __typename?: 'Query', provider?: { __typename?: 'Provider', id: number, email: string, fullName: string, profileImageUrl?: string | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null } | null };

export type ProviderServicesQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderServicesQueryResult = { __typename?: 'Query', providerServices: Array<{ __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null }> | null }> };

export type ProviderSocialsQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderSocialsQueryResult = { __typename?: 'Query', providerSocials?: Array<{ __typename?: 'ProviderSocial', id: number, name: string, url: string }> | null };

export type ProviderStaffsQueryVariables = Exact<{
  providerId: Scalars['Int'];
}>;


export type ProviderStaffsQueryResult = { __typename?: 'Query', providerStaffs: Array<{ __typename?: 'Staff', id: number, fullName: string }> };

export type ProvidersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Scalars['String']>;
}>;


export type ProvidersQueryResult = { __typename?: 'Query', providers: Array<{ __typename?: 'Provider', id: number, email: string, fullName: string, profileImageUrl?: string | null, profile?: { __typename?: 'ProviderProfile', id: number, tradingAreaCode: string, tradingCityName: string, tradingLatitude?: number | null, tradingLongitude?: number | null, tradingName: string, tradingProfileImageUrl?: string | null, tradingProvinceName: string, tradingStreetName?: string | null, tradingStreetNumber?: string | null, tradingSuburbName: string } | null, gallery?: Array<{ __typename?: 'ProviderGallery', id: number, fileName: string, name: string, url: string }> | null, socials?: Array<{ __typename?: 'ProviderSocial', id: number, name: string, url: string }> | null, address?: { __typename?: 'Address', id: number, streetNumber: string, streetName: string, suburbName: string, cityName: string, provinceName: string, areaCode: string, latitude?: number | null, longitude?: number | null } | null, dayTimes?: Array<{ __typename?: 'DayTime', id: number, day: { __typename?: 'Day', id: number, day?: BusinessDay | null }, time: { __typename?: 'Time', id: number, startTime: string, endTime: string } }> | null, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null, service?: { __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string } | null }> | null, staffs?: Array<{ __typename?: 'Staff', id: number, fullName: string }> | null }> };

export type ServiceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ServiceQueryResult = { __typename?: 'Query', service: { __typename?: 'Service', id: number, description: string, duration: number, durationUnit: string, inHouse: boolean, price: number, title: string, serviceProviderCategories?: Array<{ __typename?: 'ServiceProviderCategory', category?: { __typename?: 'Category', id: number, category: string } | null }> | null } };

export type SocialQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SocialQueryResult = { __typename?: 'Query', social: { __typename?: 'ProviderSocial', id: number, name: string, url: string } };

export type StaffQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type StaffQueryResult = { __typename?: 'Query', staff: { __typename?: 'Staff', id: number, fullName: string } };


export const AddProviderProfileMutationGql = /*#__PURE__*/ `
    mutation addProviderProfileMutation($tradingName: String!, $tradingStreetNumber: String!, $tradingStreetName: String!, $tradingSuburbName: String!, $tradingCityName: String!, $tradingProvinceName: String!, $tradingAreaCode: String!, $tradingLatitude: Float, $tradingLongitude: Float, $tradingProfileImage: File) {
  addProviderProfile(
    tradingName: $tradingName
    tradingStreetNumber: $tradingStreetNumber
    tradingStreetName: $tradingStreetName
    tradingSuburbName: $tradingSuburbName
    tradingCityName: $tradingCityName
    tradingProvinceName: $tradingProvinceName
    tradingAreaCode: $tradingAreaCode
    tradingLatitude: $tradingLatitude
    tradingLongitude: $tradingLongitude
    tradingProfileImage: $tradingProfileImage
  ) {
    message {
      message
    }
    profile {
      id
      tradingName
      tradingStreetNumber
      tradingStreetName
      tradingSuburbName
      tradingCityName
      tradingProvinceName
      tradingAreaCode
      tradingLatitude
      tradingLongitude
    }
  }
}
    `;
export const useAddProviderProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddProviderProfileMutationResult, TError, AddProviderProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddProviderProfileMutationResult, TError, AddProviderProfileMutationVariables, TContext>(
      ['addProviderProfileMutation'],
      (variables?: AddProviderProfileMutationVariables) => fetcher<AddProviderProfileMutationResult, AddProviderProfileMutationVariables>(client, AddProviderProfileMutationGql, variables, headers)(),
      options
    );
export const AddGalleryMutationGql = /*#__PURE__*/ `
    mutation addGalleryMutation($name: String!, $galleryImageFile: File!) {
  addGallery(name: $name, galleryImageFile: $galleryImageFile) {
    message {
      message
    }
    gallery {
      id
      fileName
      name
      url
    }
  }
}
    `;
export const useAddGalleryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddGalleryMutationResult, TError, AddGalleryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddGalleryMutationResult, TError, AddGalleryMutationVariables, TContext>(
      ['addGalleryMutation'],
      (variables?: AddGalleryMutationVariables) => fetcher<AddGalleryMutationResult, AddGalleryMutationVariables>(client, AddGalleryMutationGql, variables, headers)(),
      options
    );
export const AddOperatingTimeMutationGql = /*#__PURE__*/ `
    mutation addOperatingTimeMutation($day: String!, $startTime: String!, $endTime: String!) {
  addOperatingTime(day: $day, startTime: $startTime, endTime: $endTime) {
    message {
      message
    }
    operatingTime {
      id
      day {
        id
        day
      }
      time {
        id
        startTime
        endTime
      }
    }
  }
}
    `;
export const useAddOperatingTimeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddOperatingTimeMutationResult, TError, AddOperatingTimeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddOperatingTimeMutationResult, TError, AddOperatingTimeMutationVariables, TContext>(
      ['addOperatingTimeMutation'],
      (variables?: AddOperatingTimeMutationVariables) => fetcher<AddOperatingTimeMutationResult, AddOperatingTimeMutationVariables>(client, AddOperatingTimeMutationGql, variables, headers)(),
      options
    );
export const AddServiceMutationGql = /*#__PURE__*/ `
    mutation addServiceMutation($category: String!, $title: String!, $description: String!, $duration: Float!, $durationUnit: String!, $price: Float!, $inHouse: Boolean!) {
  addService(
    category: $category
    title: $title
    description: $description
    duration: $duration
    durationUnit: $durationUnit
    price: $price
    inHouse: $inHouse
  ) {
    message {
      message
    }
    service {
      id
      description
      duration
      durationUnit
      inHouse
      price
      title
      serviceProviderCategories {
        category {
          id
          category
        }
      }
    }
  }
}
    `;
export const useAddServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddServiceMutationResult, TError, AddServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddServiceMutationResult, TError, AddServiceMutationVariables, TContext>(
      ['addServiceMutation'],
      (variables?: AddServiceMutationVariables) => fetcher<AddServiceMutationResult, AddServiceMutationVariables>(client, AddServiceMutationGql, variables, headers)(),
      options
    );
export const AddSocialMutationGql = /*#__PURE__*/ `
    mutation addSocialMutation($name: String!, $url: String!) {
  addSocial(name: $name, url: $url) {
    message {
      message
    }
    social {
      id
      name
      url
    }
  }
}
    `;
export const useAddSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddSocialMutationResult, TError, AddSocialMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddSocialMutationResult, TError, AddSocialMutationVariables, TContext>(
      ['addSocialMutation'],
      (variables?: AddSocialMutationVariables) => fetcher<AddSocialMutationResult, AddSocialMutationVariables>(client, AddSocialMutationGql, variables, headers)(),
      options
    );
export const AddStaffMutationGql = /*#__PURE__*/ `
    mutation addStaffMutation($fullName: String!) {
  addStaff(fullName: $fullName) {
    message {
      message
    }
    staff {
      id
      fullName
    }
  }
}
    `;
export const useAddStaffMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AddStaffMutationResult, TError, AddStaffMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AddStaffMutationResult, TError, AddStaffMutationVariables, TContext>(
      ['addStaffMutation'],
      (variables?: AddStaffMutationVariables) => fetcher<AddStaffMutationResult, AddStaffMutationVariables>(client, AddStaffMutationGql, variables, headers)(),
      options
    );
export const DeleteGalleryMutationGql = /*#__PURE__*/ `
    mutation deleteGalleryMutation($galleryId: Int!, $fileName: String!) {
  deleteGallery(galleryId: $galleryId, fileName: $fileName) {
    message {
      message
    }
    gallery {
      id
      fileName
      name
      url
    }
  }
}
    `;
export const useDeleteGalleryMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteGalleryMutationResult, TError, DeleteGalleryMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteGalleryMutationResult, TError, DeleteGalleryMutationVariables, TContext>(
      ['deleteGalleryMutation'],
      (variables?: DeleteGalleryMutationVariables) => fetcher<DeleteGalleryMutationResult, DeleteGalleryMutationVariables>(client, DeleteGalleryMutationGql, variables, headers)(),
      options
    );
export const DeleteOperatingTimeMutationGql = /*#__PURE__*/ `
    mutation deleteOperatingTimeMutation($dayTimeId: Int!) {
  deleteOperatingTime(dayTimeId: $dayTimeId) {
    message {
      message
    }
    operatingTime {
      id
      day {
        id
        day
      }
      time {
        id
        startTime
        endTime
      }
    }
  }
}
    `;
export const useDeleteOperatingTimeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteOperatingTimeMutationResult, TError, DeleteOperatingTimeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteOperatingTimeMutationResult, TError, DeleteOperatingTimeMutationVariables, TContext>(
      ['deleteOperatingTimeMutation'],
      (variables?: DeleteOperatingTimeMutationVariables) => fetcher<DeleteOperatingTimeMutationResult, DeleteOperatingTimeMutationVariables>(client, DeleteOperatingTimeMutationGql, variables, headers)(),
      options
    );
export const DeleteServiceMutationGql = /*#__PURE__*/ `
    mutation deleteServiceMutation($serviceId: Int!, $categoryId: Int!) {
  deleteService(serviceId: $serviceId, categoryId: $categoryId) {
    message {
      message
    }
    service {
      id
      description
      duration
      durationUnit
      inHouse
      price
      title
      serviceProviderCategories {
        category {
          id
          category
        }
      }
    }
  }
}
    `;
export const useDeleteServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteServiceMutationResult, TError, DeleteServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteServiceMutationResult, TError, DeleteServiceMutationVariables, TContext>(
      ['deleteServiceMutation'],
      (variables?: DeleteServiceMutationVariables) => fetcher<DeleteServiceMutationResult, DeleteServiceMutationVariables>(client, DeleteServiceMutationGql, variables, headers)(),
      options
    );
export const DeleteSocialMutationGql = /*#__PURE__*/ `
    mutation deleteSocialMutation($socialId: Int!) {
  deleteSocial(socialId: $socialId) {
    message {
      message
    }
    social {
      id
      name
      url
    }
  }
}
    `;
export const useDeleteSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteSocialMutationResult, TError, DeleteSocialMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteSocialMutationResult, TError, DeleteSocialMutationVariables, TContext>(
      ['deleteSocialMutation'],
      (variables?: DeleteSocialMutationVariables) => fetcher<DeleteSocialMutationResult, DeleteSocialMutationVariables>(client, DeleteSocialMutationGql, variables, headers)(),
      options
    );
export const DeleteStaffMutationGql = /*#__PURE__*/ `
    mutation deleteStaffMutation($staffId: Int!) {
  deleteStaff(staffId: $staffId) {
    message {
      message
    }
    staff {
      id
      fullName
    }
  }
}
    `;
export const useDeleteStaffMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteStaffMutationResult, TError, DeleteStaffMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteStaffMutationResult, TError, DeleteStaffMutationVariables, TContext>(
      ['deleteStaffMutation'],
      (variables?: DeleteStaffMutationVariables) => fetcher<DeleteStaffMutationResult, DeleteStaffMutationVariables>(client, DeleteStaffMutationGql, variables, headers)(),
      options
    );
export const EditOperatingTimeMutationGql = /*#__PURE__*/ `
    mutation editOperatingTimeMutation($dayTimeId: Int!, $day: String!, $startTime: String, $endTime: String) {
  editOperatingTime(
    dayTimeId: $dayTimeId
    day: $day
    startTime: $startTime
    endTime: $endTime
  ) {
    message {
      message
    }
    operatingTime {
      id
      day {
        id
        day
      }
      time {
        id
        startTime
        endTime
      }
    }
  }
}
    `;
export const useEditOperatingTimeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditOperatingTimeMutationResult, TError, EditOperatingTimeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditOperatingTimeMutationResult, TError, EditOperatingTimeMutationVariables, TContext>(
      ['editOperatingTimeMutation'],
      (variables?: EditOperatingTimeMutationVariables) => fetcher<EditOperatingTimeMutationResult, EditOperatingTimeMutationVariables>(client, EditOperatingTimeMutationGql, variables, headers)(),
      options
    );
export const EditProfileMutationGql = /*#__PURE__*/ `
    mutation editProfileMutation($fullName: String, $streetNumber: String, $streetName: String, $suburbName: String, $cityName: String, $provinceName: String, $areaCode: String, $latitude: Float, $longitude: Float, $profileImage: File) {
  editProfile(
    fullName: $fullName
    streetNumber: $streetNumber
    streetName: $streetName
    suburbName: $suburbName
    cityName: $cityName
    provinceName: $provinceName
    areaCode: $areaCode
    latitude: $latitude
    longitude: $longitude
    profileImage: $profileImage
  ) {
    message {
      message
    }
    provider {
      id
      email
      fullName
      phoneNumber
      profileImageUrl
      token
      role
      address {
        id
        streetNumber
        streetName
        suburbName
        cityName
        provinceName
        areaCode
        latitude
        longitude
      }
    }
    client {
      id
      email
      fullName
      phoneNumber
      profileImageUrl
      token
      role
      address {
        id
        streetNumber
        streetName
        suburbName
        cityName
        provinceName
        areaCode
        latitude
        longitude
      }
    }
  }
}
    `;
export const useEditProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditProfileMutationResult, TError, EditProfileMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditProfileMutationResult, TError, EditProfileMutationVariables, TContext>(
      ['editProfileMutation'],
      (variables?: EditProfileMutationVariables) => fetcher<EditProfileMutationResult, EditProfileMutationVariables>(client, EditProfileMutationGql, variables, headers)(),
      options
    );
export const EditServiceMutationGql = /*#__PURE__*/ `
    mutation editServiceMutation($serviceId: Int!, $category: String, $title: String, $description: String, $duration: Float, $durationUnit: String, $price: Float, $inHouse: Boolean) {
  editService(
    serviceId: $serviceId
    category: $category
    title: $title
    description: $description
    duration: $duration
    durationUnit: $durationUnit
    price: $price
    inHouse: $inHouse
  ) {
    message {
      message
    }
    service {
      id
      description
      duration
      durationUnit
      inHouse
      price
      title
      serviceProviderCategories {
        category {
          id
          category
        }
      }
    }
  }
}
    `;
export const useEditServiceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditServiceMutationResult, TError, EditServiceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditServiceMutationResult, TError, EditServiceMutationVariables, TContext>(
      ['editServiceMutation'],
      (variables?: EditServiceMutationVariables) => fetcher<EditServiceMutationResult, EditServiceMutationVariables>(client, EditServiceMutationGql, variables, headers)(),
      options
    );
export const EditSocialMutationGql = /*#__PURE__*/ `
    mutation editSocialMutation($socialId: Int!, $name: String, $url: String) {
  editSocial(socialId: $socialId, name: $name, url: $url) {
    message {
      message
    }
    social {
      id
      name
      url
    }
  }
}
    `;
export const useEditSocialMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditSocialMutationResult, TError, EditSocialMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditSocialMutationResult, TError, EditSocialMutationVariables, TContext>(
      ['editSocialMutation'],
      (variables?: EditSocialMutationVariables) => fetcher<EditSocialMutationResult, EditSocialMutationVariables>(client, EditSocialMutationGql, variables, headers)(),
      options
    );
export const EditStaffMutationGql = /*#__PURE__*/ `
    mutation editStaffMutation($staffId: Int!, $fullName: String) {
  editStaff(staffId: $staffId, fullName: $fullName) {
    message {
      message
    }
    staff {
      id
      fullName
    }
  }
}
    `;
export const useEditStaffMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditStaffMutationResult, TError, EditStaffMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditStaffMutationResult, TError, EditStaffMutationVariables, TContext>(
      ['editStaffMutation'],
      (variables?: EditStaffMutationVariables) => fetcher<EditStaffMutationResult, EditStaffMutationVariables>(client, EditStaffMutationGql, variables, headers)(),
      options
    );
export const RequestResetPasswordMutationGql = /*#__PURE__*/ `
    mutation requestResetPasswordMutation($email: String!, $isProvider: Boolean!) {
  requestResetPassword(email: $email, isProvider: $isProvider) {
    message
  }
}
    `;
export const useRequestResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RequestResetPasswordMutationResult, TError, RequestResetPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RequestResetPasswordMutationResult, TError, RequestResetPasswordMutationVariables, TContext>(
      ['requestResetPasswordMutation'],
      (variables?: RequestResetPasswordMutationVariables) => fetcher<RequestResetPasswordMutationResult, RequestResetPasswordMutationVariables>(client, RequestResetPasswordMutationGql, variables, headers)(),
      options
    );
export const ResetPasswordMutationGql = /*#__PURE__*/ `
    mutation resetPasswordMutation($oneTimePin: String!, $password: String!, $isProvider: Boolean!) {
  resetPassword(
    oneTimePin: $oneTimePin
    password: $password
    isProvider: $isProvider
  ) {
    message
  }
}
    `;
export const useResetPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ResetPasswordMutationResult, TError, ResetPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ResetPasswordMutationResult, TError, ResetPasswordMutationVariables, TContext>(
      ['resetPasswordMutation'],
      (variables?: ResetPasswordMutationVariables) => fetcher<ResetPasswordMutationResult, ResetPasswordMutationVariables>(client, ResetPasswordMutationGql, variables, headers)(),
      options
    );
export const SendMailMutationGql = /*#__PURE__*/ `
    mutation sendMailMutation($fullName: String!, $subject: String!, $email: String!, $message: String!) {
  sendMail(
    fullName: $fullName
    subject: $subject
    email: $email
    message: $message
  ) {
    message
  }
}
    `;
export const useSendMailMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SendMailMutationResult, TError, SendMailMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SendMailMutationResult, TError, SendMailMutationVariables, TContext>(
      ['sendMailMutation'],
      (variables?: SendMailMutationVariables) => fetcher<SendMailMutationResult, SendMailMutationVariables>(client, SendMailMutationGql, variables, headers)(),
      options
    );
export const SigninClientMutationGql = /*#__PURE__*/ `
    mutation signinClientMutation($email: String!, $password: String!) {
  signinClient(email: $email, password: $password) {
    id
    email
    fullName
    phoneNumber
    profileImageUrl
    token
    role
    address {
      id
      streetNumber
      streetName
      suburbName
      cityName
      provinceName
      areaCode
      latitude
      longitude
    }
  }
}
    `;
export const useSigninClientMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SigninClientMutationResult, TError, SigninClientMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SigninClientMutationResult, TError, SigninClientMutationVariables, TContext>(
      ['signinClientMutation'],
      (variables?: SigninClientMutationVariables) => fetcher<SigninClientMutationResult, SigninClientMutationVariables>(client, SigninClientMutationGql, variables, headers)(),
      options
    );
export const SigninProviderMutationGql = /*#__PURE__*/ `
    mutation signinProviderMutation($email: String!, $password: String!) {
  signinProvider(email: $email, password: $password) {
    id
    email
    fullName
    phoneNumber
    profileImageUrl
    token
    role
    address {
      id
      streetNumber
      streetName
      suburbName
      cityName
      provinceName
      areaCode
      latitude
      longitude
    }
  }
}
    `;
export const useSigninProviderMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SigninProviderMutationResult, TError, SigninProviderMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SigninProviderMutationResult, TError, SigninProviderMutationVariables, TContext>(
      ['signinProviderMutation'],
      (variables?: SigninProviderMutationVariables) => fetcher<SigninProviderMutationResult, SigninProviderMutationVariables>(client, SigninProviderMutationGql, variables, headers)(),
      options
    );
export const SignupClientMutationGql = /*#__PURE__*/ `
    mutation signupClientMutation($fullName: String!, $email: String!, $password: String!, $phoneNumber: String!) {
  signupClient(
    fullName: $fullName
    email: $email
    password: $password
    phoneNumber: $phoneNumber
  ) {
    message
  }
}
    `;
export const useSignupClientMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupClientMutationResult, TError, SignupClientMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupClientMutationResult, TError, SignupClientMutationVariables, TContext>(
      ['signupClientMutation'],
      (variables?: SignupClientMutationVariables) => fetcher<SignupClientMutationResult, SignupClientMutationVariables>(client, SignupClientMutationGql, variables, headers)(),
      options
    );
export const SignupProviderMutationGql = /*#__PURE__*/ `
    mutation signupProviderMutation($fullName: String!, $email: String!, $password: String!, $phoneNumber: String!) {
  signupProvider(
    fullName: $fullName
    email: $email
    password: $password
    phoneNumber: $phoneNumber
  ) {
    message
  }
}
    `;
export const useSignupProviderMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignupProviderMutationResult, TError, SignupProviderMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignupProviderMutationResult, TError, SignupProviderMutationVariables, TContext>(
      ['signupProviderMutation'],
      (variables?: SignupProviderMutationVariables) => fetcher<SignupProviderMutationResult, SignupProviderMutationVariables>(client, SignupProviderMutationGql, variables, headers)(),
      options
    );
export const ClientQueryGql = /*#__PURE__*/ `
    query clientQuery {
  client {
    id
    email
    fullName
    profileImageUrl
    address {
      id
      streetNumber
      streetName
      suburbName
      cityName
      provinceName
      areaCode
      latitude
      longitude
    }
  }
}
    `;
export const useClientQuery = <
      TData = ClientQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ClientQueryVariables,
      options?: UseQueryOptions<ClientQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ClientQueryResult, TError, TData>(
      variables === undefined ? ['clientQuery'] : ['clientQuery', variables],
      fetcher<ClientQueryResult, ClientQueryVariables>(client, ClientQueryGql, variables, headers),
      options
    );
export const GalleryQueryGql = /*#__PURE__*/ `
    query galleryQuery($id: Int!) {
  gallery(id: $id) {
    id
    fileName
    name
    url
  }
}
    `;
export const useGalleryQuery = <
      TData = GalleryQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GalleryQueryVariables,
      options?: UseQueryOptions<GalleryQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GalleryQueryResult, TError, TData>(
      ['galleryQuery', variables],
      fetcher<GalleryQueryResult, GalleryQueryVariables>(client, GalleryQueryGql, variables, headers),
      options
    );
export const OperatingTimeQueryGql = /*#__PURE__*/ `
    query operatingTimeQuery($id: Int!) {
  operatingTime(id: $id) {
    id
    day {
      id
      day
    }
    time {
      id
      startTime
      endTime
    }
  }
}
    `;
export const useOperatingTimeQuery = <
      TData = OperatingTimeQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: OperatingTimeQueryVariables,
      options?: UseQueryOptions<OperatingTimeQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<OperatingTimeQueryResult, TError, TData>(
      ['operatingTimeQuery', variables],
      fetcher<OperatingTimeQueryResult, OperatingTimeQueryVariables>(client, OperatingTimeQueryGql, variables, headers),
      options
    );
export const ProviderGalleryQueryGql = /*#__PURE__*/ `
    query providerGalleryQuery($providerId: Int!) {
  providerGallery(providerId: $providerId) {
    id
    fileName
    name
    url
  }
}
    `;
export const useProviderGalleryQuery = <
      TData = ProviderGalleryQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderGalleryQueryVariables,
      options?: UseQueryOptions<ProviderGalleryQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderGalleryQueryResult, TError, TData>(
      ['providerGalleryQuery', variables],
      fetcher<ProviderGalleryQueryResult, ProviderGalleryQueryVariables>(client, ProviderGalleryQueryGql, variables, headers),
      options
    );
export const ProviderOperatingTimesQueryGql = /*#__PURE__*/ `
    query providerOperatingTimesQuery($providerId: Int!) {
  providerOperatingTimes(providerId: $providerId) {
    id
    day {
      id
      day
    }
    time {
      id
      startTime
      endTime
    }
  }
}
    `;
export const useProviderOperatingTimesQuery = <
      TData = ProviderOperatingTimesQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderOperatingTimesQueryVariables,
      options?: UseQueryOptions<ProviderOperatingTimesQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderOperatingTimesQueryResult, TError, TData>(
      ['providerOperatingTimesQuery', variables],
      fetcher<ProviderOperatingTimesQueryResult, ProviderOperatingTimesQueryVariables>(client, ProviderOperatingTimesQueryGql, variables, headers),
      options
    );
export const ProviderProfileQueryGql = /*#__PURE__*/ `
    query providerProfileQuery($providerId: Int!) {
  providerProfile(providerId: $providerId) {
    id
    tradingName
    tradingStreetNumber
    tradingStreetName
    tradingSuburbName
    tradingCityName
    tradingProvinceName
    tradingAreaCode
    tradingLatitude
    tradingLongitude
    tradingProfileImageUrl
  }
}
    `;
export const useProviderProfileQuery = <
      TData = ProviderProfileQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderProfileQueryVariables,
      options?: UseQueryOptions<ProviderProfileQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderProfileQueryResult, TError, TData>(
      ['providerProfileQuery', variables],
      fetcher<ProviderProfileQueryResult, ProviderProfileQueryVariables>(client, ProviderProfileQueryGql, variables, headers),
      options
    );
export const ProviderQueryGql = /*#__PURE__*/ `
    query providerQuery {
  provider {
    id
    email
    fullName
    profileImageUrl
    address {
      id
      streetNumber
      streetName
      suburbName
      cityName
      provinceName
      areaCode
      latitude
      longitude
    }
  }
}
    `;
export const useProviderQuery = <
      TData = ProviderQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProviderQueryVariables,
      options?: UseQueryOptions<ProviderQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderQueryResult, TError, TData>(
      variables === undefined ? ['providerQuery'] : ['providerQuery', variables],
      fetcher<ProviderQueryResult, ProviderQueryVariables>(client, ProviderQueryGql, variables, headers),
      options
    );
export const ProviderServicesQueryGql = /*#__PURE__*/ `
    query providerServicesQuery($providerId: Int!) {
  providerServices(providerId: $providerId) {
    id
    description
    duration
    durationUnit
    inHouse
    price
    title
    serviceProviderCategories {
      category {
        id
        category
      }
    }
  }
}
    `;
export const useProviderServicesQuery = <
      TData = ProviderServicesQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderServicesQueryVariables,
      options?: UseQueryOptions<ProviderServicesQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderServicesQueryResult, TError, TData>(
      ['providerServicesQuery', variables],
      fetcher<ProviderServicesQueryResult, ProviderServicesQueryVariables>(client, ProviderServicesQueryGql, variables, headers),
      options
    );
export const ProviderSocialsQueryGql = /*#__PURE__*/ `
    query providerSocialsQuery($providerId: Int!) {
  providerSocials(providerId: $providerId) {
    id
    name
    url
  }
}
    `;
export const useProviderSocialsQuery = <
      TData = ProviderSocialsQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderSocialsQueryVariables,
      options?: UseQueryOptions<ProviderSocialsQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderSocialsQueryResult, TError, TData>(
      ['providerSocialsQuery', variables],
      fetcher<ProviderSocialsQueryResult, ProviderSocialsQueryVariables>(client, ProviderSocialsQueryGql, variables, headers),
      options
    );
export const ProviderStaffsQueryGql = /*#__PURE__*/ `
    query providerStaffsQuery($providerId: Int!) {
  providerStaffs(providerId: $providerId) {
    id
    fullName
  }
}
    `;
export const useProviderStaffsQuery = <
      TData = ProviderStaffsQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ProviderStaffsQueryVariables,
      options?: UseQueryOptions<ProviderStaffsQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProviderStaffsQueryResult, TError, TData>(
      ['providerStaffsQuery', variables],
      fetcher<ProviderStaffsQueryResult, ProviderStaffsQueryVariables>(client, ProviderStaffsQueryGql, variables, headers),
      options
    );
export const ProvidersQueryGql = /*#__PURE__*/ `
    query providersQuery($search: String, $category: String) {
  providers(search: $search, category: $category) {
    id
    email
    fullName
    profileImageUrl
    profile {
      id
      tradingAreaCode
      tradingCityName
      tradingLatitude
      tradingLongitude
      tradingName
      tradingProfileImageUrl
      tradingProvinceName
      tradingStreetName
      tradingStreetNumber
      tradingSuburbName
    }
    gallery {
      id
      fileName
      name
      url
    }
    socials {
      id
      name
      url
    }
    address {
      id
      streetNumber
      streetName
      suburbName
      cityName
      provinceName
      areaCode
      latitude
      longitude
    }
    dayTimes {
      id
      day {
        id
        day
      }
      time {
        id
        startTime
        endTime
      }
    }
    serviceProviderCategories {
      category {
        id
        category
      }
      service {
        id
        description
        duration
        durationUnit
        inHouse
        price
        title
      }
    }
    staffs {
      id
      fullName
    }
  }
}
    `;
export const useProvidersQuery = <
      TData = ProvidersQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: ProvidersQueryVariables,
      options?: UseQueryOptions<ProvidersQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ProvidersQueryResult, TError, TData>(
      variables === undefined ? ['providersQuery'] : ['providersQuery', variables],
      fetcher<ProvidersQueryResult, ProvidersQueryVariables>(client, ProvidersQueryGql, variables, headers),
      options
    );
export const ServiceQueryGql = /*#__PURE__*/ `
    query serviceQuery($id: Int!) {
  service(id: $id) {
    id
    description
    duration
    durationUnit
    inHouse
    price
    title
    serviceProviderCategories {
      category {
        id
        category
      }
    }
  }
}
    `;
export const useServiceQuery = <
      TData = ServiceQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: ServiceQueryVariables,
      options?: UseQueryOptions<ServiceQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<ServiceQueryResult, TError, TData>(
      ['serviceQuery', variables],
      fetcher<ServiceQueryResult, ServiceQueryVariables>(client, ServiceQueryGql, variables, headers),
      options
    );
export const SocialQueryGql = /*#__PURE__*/ `
    query socialQuery($id: Int!) {
  social(id: $id) {
    id
    name
    url
  }
}
    `;
export const useSocialQuery = <
      TData = SocialQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SocialQueryVariables,
      options?: UseQueryOptions<SocialQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SocialQueryResult, TError, TData>(
      ['socialQuery', variables],
      fetcher<SocialQueryResult, SocialQueryVariables>(client, SocialQueryGql, variables, headers),
      options
    );
export const StaffQueryGql = /*#__PURE__*/ `
    query staffQuery($id: Int!) {
  staff(id: $id) {
    id
    fullName
  }
}
    `;
export const useStaffQuery = <
      TData = StaffQueryResult,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: StaffQueryVariables,
      options?: UseQueryOptions<StaffQueryResult, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<StaffQueryResult, TError, TData>(
      ['staffQuery', variables],
      fetcher<StaffQueryResult, StaffQueryVariables>(client, StaffQueryGql, variables, headers),
      options
    );