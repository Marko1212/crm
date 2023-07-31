export type InvoiceDetail = {
  quantity: number;
  amount: number;
  description: string;
};

export type InvoiceStatus = 'PAID' | 'SENT' | 'CANCELED';

export type InvoiceDetails = InvoiceDetail[];

export type Invoice = {
  id?: number;
  customer_name: string;
  description: string;
  status: InvoiceStatus;
  details: InvoiceDetails;
};
