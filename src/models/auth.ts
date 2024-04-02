export type AuthData = {
  response: {
    token: string;
  };
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};