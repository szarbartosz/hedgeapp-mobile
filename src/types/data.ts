import { Status } from '@/models/statuses';

export type Address = {
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type Note = {
  createdAt: string;
  content: string;
};

export type ApplicationData = {
  signature: string;
  isCommercial: boolean;
  deforestationCause: string;
  deforestationDate: string;
  plantingDate: string;
  plantingSite: string;
  species: string;
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
  applicationData: ApplicationData;
  notes: Note[];
};
