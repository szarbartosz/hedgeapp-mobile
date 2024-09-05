export type AddInvestorRequest = {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  nip: string;
  regon: string;
  address: {
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
  };
};
