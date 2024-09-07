import { Address, Investment } from '@/types/data';

export type Office = {
  id: number;
  name: string;
  address: Address;
  locations: Investment[];
};
