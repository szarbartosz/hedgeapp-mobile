import { Status } from '@/models/statuses';

export type Address = {
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type Note = {
  id: number;
  createdAt: string;
  content: string;
};

export type Application = {
  signature: string;
  isCommercial: string;
  deforestationCause: string;
  deforestationDate: string;
  plantingDate: string;
  plantingSite: string;
  species: string;
};

export type Office = {
  id: number;
  name: string;
  address: Address;
};

export type Investor = {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  nip: string;
  regon: string;
  locations: Investment[];
};

export type Investment = {
  id: number;
  name: string;
  status: Status;
  address: Address;
  investor: Investor;
  issueDate: string;
  inspectionDate: string;
  inspectionDone: boolean;
  decisionDate: string;
  deforestationDate: string;
  deforestationDone: boolean;
  plantingDate: string;
  plantingDone: boolean;
  application: Application;
  notes: Note[];
  office: Office;
};
