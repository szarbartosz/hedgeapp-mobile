export type AddInvestmentRequest = {
  name: string;
  investorId: number;
  statusId: number;
  officeId: number;
  address: {
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
  };
};

export type UpdateInvestmentRequest = {
  name: string;
  investorId: number;
  statusId: number;
  officeId: number;
  address: {
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
  };
};
