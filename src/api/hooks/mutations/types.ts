export interface IUseSigninClient {
  variables: { email: string; password: string };
}

export interface IUseSigninProvider {
  variables: { email: string; password: string };
}

export interface ISendEmail {
  variables: {
    fullName: string;
    subject: string;
    email: string;
    message: string;
  };
}

export interface IUseSignupClient {
  variables: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
}

export interface IUseSignupProvider {
  variables: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
}

export interface IUseEditProfile {
  variables: {
    fullName?: string;
    streetNumber?: string;
    streetName?: string;
    suburbName?: string;
    cityName?: string;
    provinceName?: string;
    areaCode?: string;
    latitude?: number;
    longitude?: number;
  };
}
