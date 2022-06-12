export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  __typename?: "Address";
  areaCode: Scalars["String"];
  cityName: Scalars["String"];
  id: Scalars["Int"];
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  provinceName: Scalars["String"];
  streetName: Scalars["String"];
  streetNumber: Scalars["String"];
  suburbName: Scalars["String"];
};

export type Booking = {
  __typename?: "Booking";
  bookingTime: Scalars["String"];
  client: Client;
  createdAt: Scalars["String"];
  id: Scalars["Int"];
  inHouse: Scalars["Boolean"];
  provider: Provider;
  rating?: Maybe<Rating>;
  service: Service;
  staff: Staff;
  status: BookingStatus;
  transportCost?: Maybe<TransportCost>;
};

export enum BookingStatus {
  Active = "Active",
  Cancelled = "Cancelled",
  Deleted = "Deleted",
  Done = "Done",
  Pending = "Pending",
}

export enum BusinessDay {
  Fri = "Fri",
  Mon = "Mon",
  Sat = "Sat",
  Sun = "Sun",
  Thu = "Thu",
  Tue = "Tue",
  Wed = "Wed",
}

export type Category = {
  __typename?: "Category";
  category: Scalars["String"];
  id: Scalars["Int"];
};

export type Client = {
  __typename?: "Client";
  address?: Maybe<Address>;
  bookings?: Maybe<Array<Booking>>;
  email: Scalars["String"];
  fullName: Scalars["String"];
  id: Scalars["Int"];
  phoneNumber?: Maybe<Scalars["String"]>;
  profileImageUrl?: Maybe<Scalars["String"]>;
  role: Scalars["String"];
  token?: Maybe<Scalars["String"]>;
};

export type Day = {
  __typename?: "Day";
  day?: Maybe<BusinessDay>;
  id: Scalars["Int"];
};

export type DayTime = {
  __typename?: "DayTime";
  day: Day;
  id: Scalars["Int"];
  provider: Provider;
  time: Time;
};

export type Message = {
  __typename?: "Message";
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
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
  editProfile: Message;
  editService: ServiceMessage;
  editSocial: ProviderSocialMessage;
  editStaff: StaffMessage;
  providerBookingCancel: Message;
  providerBookingDone: Message;
  sendMail: Message;
  signinClient: Client;
  signinProvider: Provider;
  signupClient: Message;
  signupProvider: Message;
};

export type MutationAddGalleryArgs = {
  galleryImageFile: Scalars["File"];
  name: Scalars["String"];
};

export type MutationAddOperatingTimeArgs = {
  day: Scalars["String"];
  endTime: Scalars["String"];
  startTime: Scalars["String"];
};

export type MutationAddProviderProfileArgs = {
  tradingAreaCode: Scalars["String"];
  tradingCityName: Scalars["String"];
  tradingLatitude?: InputMaybe<Scalars["Float"]>;
  tradingLongitude?: InputMaybe<Scalars["Float"]>;
  tradingName: Scalars["String"];
  tradingProfileImage?: InputMaybe<Scalars["File"]>;
  tradingProvinceName: Scalars["String"];
  tradingStreetName: Scalars["String"];
  tradingStreetNumber: Scalars["String"];
  tradingSuburbName: Scalars["String"];
};

export type MutationAddServiceArgs = {
  category: Scalars["String"];
  description: Scalars["String"];
  duration: Scalars["Float"];
  durationUnit: Scalars["String"];
  inHouse: Scalars["Boolean"];
  price: Scalars["Float"];
  title: Scalars["String"];
};

export type MutationAddSocialArgs = {
  name: Scalars["String"];
  url: Scalars["String"];
};

export type MutationAddStaffArgs = {
  fullName: Scalars["String"];
};

export type MutationClientBookArgs = {
  address?: InputMaybe<Scalars["String"]>;
  bookingDate: Scalars["String"];
  bookingTime: Scalars["String"];
  inHouse: Scalars["Boolean"];
  providerId: Scalars["Int"];
  serviceId: Scalars["Int"];
  staffId: Scalars["Int"];
};

export type MutationClientBookingCancelArgs = {
  bookingId: Scalars["Int"];
  cancel: Scalars["Boolean"];
};

export type MutationClientBookingCompleteArgs = {
  bookingId: Scalars["Int"];
  complete: Scalars["Boolean"];
};

export type MutationClientBookingDeleteArgs = {
  bookingId: Scalars["Int"];
  delete: Scalars["Boolean"];
};

export type MutationClientBookingRateArgs = {
  bookingId: Scalars["Int"];
  comment?: InputMaybe<Scalars["String"]>;
  rate: Scalars["Float"];
  ratingId?: InputMaybe<Scalars["Int"]>;
};

export type MutationDeleteGalleryArgs = {
  fileName: Scalars["String"];
  galleryId: Scalars["Int"];
};

export type MutationDeleteOperatingTimeArgs = {
  dayTimeId: Scalars["Int"];
};

export type MutationDeleteServiceArgs = {
  categoryId: Scalars["Int"];
  serviceId: Scalars["Int"];
};

export type MutationDeleteSocialArgs = {
  socialId: Scalars["Int"];
};

export type MutationDeleteStaffArgs = {
  staffId: Scalars["Int"];
};

export type MutationEditOperatingTimeArgs = {
  day: Scalars["String"];
  dayTimeId: Scalars["Int"];
  endTime?: InputMaybe<Scalars["String"]>;
  startTime?: InputMaybe<Scalars["String"]>;
};

export type MutationEditProfileArgs = {
  areaCode?: InputMaybe<Scalars["String"]>;
  cityName?: InputMaybe<Scalars["String"]>;
  fullName?: InputMaybe<Scalars["String"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  profileImage?: InputMaybe<Scalars["File"]>;
  provinceName?: InputMaybe<Scalars["String"]>;
  streetName?: InputMaybe<Scalars["String"]>;
  streetNumber?: InputMaybe<Scalars["String"]>;
  suburbName?: InputMaybe<Scalars["String"]>;
};

export type MutationEditServiceArgs = {
  category?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  duration?: InputMaybe<Scalars["Float"]>;
  durationUnit?: InputMaybe<Scalars["String"]>;
  inHouse?: InputMaybe<Scalars["Boolean"]>;
  price?: InputMaybe<Scalars["Float"]>;
  serviceId: Scalars["Int"];
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationEditSocialArgs = {
  name?: InputMaybe<Scalars["String"]>;
  socialId: Scalars["Int"];
  url?: InputMaybe<Scalars["String"]>;
};

export type MutationEditStaffArgs = {
  fullName?: InputMaybe<Scalars["String"]>;
  staffId: Scalars["Int"];
};

export type MutationProviderBookingCancelArgs = {
  bookingId: Scalars["Int"];
  cancel: Scalars["Boolean"];
};

export type MutationProviderBookingDoneArgs = {
  bookingId: Scalars["Int"];
  done: Scalars["Boolean"];
};

export type MutationSendMailArgs = {
  email: Scalars["String"];
  fullName: Scalars["String"];
  message: Scalars["String"];
  subject: Scalars["String"];
};

export type MutationSigninClientArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  verify?: InputMaybe<Scalars["String"]>;
};

export type MutationSigninProviderArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  verify?: InputMaybe<Scalars["String"]>;
};

export type MutationSignupClientArgs = {
  email: Scalars["String"];
  fullName: Scalars["String"];
  password: Scalars["String"];
  phoneNumber: Scalars["String"];
};

export type MutationSignupProviderArgs = {
  email: Scalars["String"];
  fullName: Scalars["String"];
  password: Scalars["String"];
  phoneNumber: Scalars["String"];
};

export type OperatingTimeMessage = {
  __typename?: "OperatingTimeMessage";
  message: Message;
  operatingTime: DayTime;
};

export type Provider = {
  __typename?: "Provider";
  address?: Maybe<Address>;
  bookings?: Maybe<Array<Booking>>;
  dayTimes?: Maybe<Array<DayTime>>;
  email: Scalars["String"];
  fullName: Scalars["String"];
  gallery?: Maybe<Array<ProviderGallery>>;
  id: Scalars["Int"];
  phoneNumber?: Maybe<Scalars["String"]>;
  profile?: Maybe<ProviderProfile>;
  profileImageUrl?: Maybe<Scalars["String"]>;
  role: Scalars["String"];
  serviceProviderCategories?: Maybe<Array<ServiceProviderCategory>>;
  socials?: Maybe<Array<ProviderSocial>>;
  staffs?: Maybe<Array<Staff>>;
  token?: Maybe<Scalars["String"]>;
};

export type ProviderGallery = {
  __typename?: "ProviderGallery";
  fileName: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
  url: Scalars["String"];
};

export type ProviderGalleryMessage = {
  __typename?: "ProviderGalleryMessage";
  gallery: ProviderGallery;
  message: Message;
};

export type ProviderProfile = {
  __typename?: "ProviderProfile";
  id: Scalars["Int"];
  tradingAreaCode: Scalars["String"];
  tradingCityName: Scalars["String"];
  tradingLatitude?: Maybe<Scalars["Float"]>;
  tradingLongitude?: Maybe<Scalars["Float"]>;
  tradingName: Scalars["String"];
  tradingProfileImageUrl?: Maybe<Scalars["String"]>;
  tradingProvinceName: Scalars["String"];
  tradingStreetName?: Maybe<Scalars["String"]>;
  tradingStreetNumber?: Maybe<Scalars["String"]>;
  tradingSuburbName: Scalars["String"];
};

export type ProviderProfileMessage = {
  __typename?: "ProviderProfileMessage";
  message: Message;
  profile: ProviderProfile;
};

export type ProviderSocial = {
  __typename?: "ProviderSocial";
  id: Scalars["Int"];
  name: Scalars["String"];
  url: Scalars["String"];
};

export type ProviderSocialMessage = {
  __typename?: "ProviderSocialMessage";
  message: Message;
  social: ProviderSocial;
};

export type Query = {
  __typename?: "Query";
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
  clientId: Scalars["Int"];
};

export type QueryGalleryArgs = {
  id: Scalars["Int"];
};

export type QueryOperatingTimeArgs = {
  id: Scalars["Int"];
};

export type QueryProviderBookingsArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderGalleryArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderOperatingTimesArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderProfileArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderRatingsArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderServicesArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderSocialsArgs = {
  providerId: Scalars["Int"];
};

export type QueryProviderStaffsArgs = {
  providerId: Scalars["Int"];
};

export type QueryProvidersArgs = {
  category?: InputMaybe<Scalars["String"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type QueryServiceArgs = {
  id: Scalars["Int"];
};

export type QuerySocialArgs = {
  id: Scalars["Int"];
};

export type QueryStaffArgs = {
  id: Scalars["Int"];
};

export type Rating = {
  __typename?: "Rating";
  comment?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  rate: Scalars["Float"];
};

export type Service = {
  __typename?: "Service";
  description: Scalars["String"];
  duration: Scalars["Float"];
  durationUnit: Scalars["String"];
  id: Scalars["Int"];
  inHouse: Scalars["Boolean"];
  price: Scalars["Float"];
  serviceProviderCategories?: Maybe<Array<ServiceProviderCategory>>;
  staff?: Maybe<Staff>;
  title: Scalars["String"];
};

export type ServiceMessage = {
  __typename?: "ServiceMessage";
  message: Message;
  service: Service;
};

export type ServiceProviderCategory = {
  __typename?: "ServiceProviderCategory";
  category?: Maybe<Category>;
  provider?: Maybe<Provider>;
  service?: Maybe<Service>;
};

export type Staff = {
  __typename?: "Staff";
  bookings?: Maybe<Array<Booking>>;
  fullName: Scalars["String"];
  id: Scalars["Int"];
  provider: Provider;
  services?: Maybe<Array<Service>>;
};

export type StaffMessage = {
  __typename?: "StaffMessage";
  message: Message;
  staff: Staff;
};

export type Subscription = {
  __typename?: "Subscription";
  bookingCancelled: BookingCancelledSubscription;
  bookingDone: BookingDoneSubscription;
  bookingMade: BookingMadeSubscription;
  bookingPaid: BookingPaidSubscription;
  bookingRateService: BookingRateServiceSubscription;
};

export type SubscriptionBookingCancelledArgs = {
  bookingId: Scalars["Int"];
};

export type SubscriptionBookingDoneArgs = {
  bookingId: Scalars["Int"];
};

export type SubscriptionBookingMadeArgs = {
  providerId: Scalars["Int"];
};

export type SubscriptionBookingPaidArgs = {
  bookingId: Scalars["Int"];
};

export type SubscriptionBookingRateServiceArgs = {
  bookingId: Scalars["Int"];
};

export type Time = {
  __typename?: "Time";
  endTime: Scalars["String"];
  id: Scalars["Int"];
  startTime: Scalars["String"];
};

export type TransportCost = {
  __typename?: "TransportCost";
  distance: Scalars["Float"];
  estimatedCost: Scalars["Float"];
  id: Scalars["Int"];
};

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
  Pending = "Pending",
  Suspended = "Suspended",
}

export type BookingCancelledSubscription = {
  __typename?: "bookingCancelledSubscription";
  id: Scalars["Int"];
  mutation: Scalars["String"];
};

export type BookingDoneSubscription = {
  __typename?: "bookingDoneSubscription";
  id: Scalars["Int"];
  mutation: Scalars["String"];
};

export type BookingMadeSubscription = {
  __typename?: "bookingMadeSubscription";
  bookingId: Scalars["Int"];
  id: Scalars["Int"];
  mutation: Scalars["String"];
};

export type BookingPaidSubscription = {
  __typename?: "bookingPaidSubscription";
  id: Scalars["Int"];
  mutation: Scalars["String"];
};

export type BookingRateServiceSubscription = {
  __typename?: "bookingRateServiceSubscription";
  id: Scalars["Int"];
  mutation: Scalars["String"];
};
