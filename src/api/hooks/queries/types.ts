import {
  QueryGalleryArgs,
  QueryOperatingTimeArgs,
  QueryProviderGalleryArgs,
  QueryProviderOperatingTimesArgs,
  QueryProviderProfileArgs,
  QueryProvidersArgs,
  QueryProviderServicesArgs,
  QueryProviderSocialsArgs,
  QueryProviderStaffsArgs,
  QueryServiceArgs,
  QuerySocialArgs,
  QueryStaffArgs,
} from "api/generated/schema";

export interface IUseFetchProviders {
  variables: QueryProvidersArgs;
}

export interface IUseFetchProviderServices {
  variables: QueryProviderServicesArgs;
}

export interface IUseFetchProviderStaffs {
  variables: QueryProviderStaffsArgs;
}
export interface IUseFetchProviderGallery {
  variables: QueryProviderGalleryArgs;
}

export interface IUseFetchProviderSocials {
  variables: QueryProviderSocialsArgs;
}

export interface IUseFetchProviderPrifle {
  variables: QueryProviderProfileArgs;
}

export interface IUseFetchProviderOperatingTimes {
  variables: QueryProviderOperatingTimesArgs;
}

export interface IUseFetchService {
  variables: QueryServiceArgs;
}

export interface IUseFetchStaff {
  variables: QueryStaffArgs;
}

export interface IUseFetchGallery {
  variables: QueryGalleryArgs;
}

export interface IUseFetchSocial {
  variables: QuerySocialArgs;
}

export interface IUseFetchOperatingTime {
  variables: QueryOperatingTimeArgs;
}
