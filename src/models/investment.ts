export type AddInvestmentRequest = {
  name: string;
  investorId: number;
  statusId: number;
  officeId: number;
  city?: string;
  street?: string;
  number?: string;
};
