export type AddInvestmentRequest = {
  name: string;
  investorId: number;
  statusId: number;
  officeId: number;
  address: {
    city?: string;
    street?: string;
    number?: string;
  };
};
