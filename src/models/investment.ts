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
  investorId?: number;
  statusId?: number;
  officeId?: number;
  issueDate?: string;
  inspectionDate?: string;
  inspectionDone?: boolean;
  decisionDate?: string;
  deforestationDate?: string;
  deforestationDone?: boolean;
  plantingDate?: string;
  plantingDone?: boolean;
  address: {
    id?: number;
    userId?: number;
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
  };
  application?: UpdateApplicationRequest;
};

export type UpdateApplicationRequest = {
  signature?: string;
  isCommercial?: string;
  deforestationCause?: string;
  deforestationDate?: string;
  plantingDate?: string;
  plantingSite?: string;
  species?: string;
};
