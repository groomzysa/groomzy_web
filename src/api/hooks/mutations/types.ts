import {
  MutationAddGalleryArgs,
  MutationAddOperatingTimeArgs,
  MutationAddProviderProfileArgs,
  MutationAddServiceArgs,
  MutationAddSocialArgs,
  MutationAddStaffArgs,
  MutationDeleteGalleryArgs,
  MutationDeleteOperatingTimeArgs,
  MutationDeleteServiceArgs,
  MutationDeleteSocialArgs,
  MutationDeleteStaffArgs,
  MutationEditOperatingTimeArgs,
  MutationEditProfileArgs,
  MutationEditServiceArgs,
  MutationEditSocialArgs,
  MutationEditStaffArgs,
  MutationSendMailArgs,
  MutationSigninClientArgs,
  MutationSigninProviderArgs,
  MutationSignupClientArgs,
  MutationSignupProviderArgs,
} from "api/generated/schema";

export interface IUseSigninClient {
  variables: MutationSigninClientArgs;
}

export interface IUseSigninProvider {
  variables: MutationSigninProviderArgs;
}

export interface ISendEmail {
  variables: MutationSendMailArgs;
}

export interface IUseSignupClient {
  variables: MutationSignupClientArgs;
}

export interface IUseSignupProvider {
  variables: MutationSignupProviderArgs;
}

export interface IUseEditProfile {
  variables: MutationEditProfileArgs;
}

export interface IUseEditService {
  variables: MutationEditServiceArgs;
}

export interface IUseEditStaff {
  variables: MutationEditStaffArgs;
}

export interface IUseEditSocial {
  variables: MutationEditSocialArgs;
}

export interface IUseAddService {
  variables: MutationAddServiceArgs;
}

export interface IUseAddStaff {
  variables: MutationAddStaffArgs;
}

export interface IUseAddGallery {
  variables: MutationAddGalleryArgs;
}

export interface IUseAddSocial {
  variables: MutationAddSocialArgs;
}

export interface IUseAddProviderProfile {
  variables: MutationAddProviderProfileArgs;
}

export interface IUseDeleteService {
  variables: MutationDeleteServiceArgs;
}

export interface IUseDeleteStaff {
  variables: MutationDeleteStaffArgs;
}

export interface IUseDeleteGallery {
  variables: MutationDeleteGalleryArgs;
}

export interface IUseDeleteSocial {
  variables: MutationDeleteSocialArgs;
}

export interface IUseAddOperatingTime {
  variables: MutationAddOperatingTimeArgs;
}

export interface IUseEditOperatingTime {
  variables: MutationEditOperatingTimeArgs;
}

export interface IUseDeleteOperatingTime {
  variables: MutationDeleteOperatingTimeArgs;
}
