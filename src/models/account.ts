import { User } from './user';

export type Account = {
  id: number;
  email: string;
  password: string;
  details: User;
  imageUrl: string;
};

export type AccountDetails = User;

export type AccountResponse = Omit<Account, 'password'>;
