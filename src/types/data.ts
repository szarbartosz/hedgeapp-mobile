export type Address = {
  city: string;
  street: string;
  number: string;
};

export type Note = {
  date: string;
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
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: Address;
  nip: string;
  regon: string;
};

export type Investment = {
  id: number;
  name: string;
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
