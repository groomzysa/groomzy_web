export interface IUseSigninClient {
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
