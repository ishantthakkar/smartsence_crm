export interface BillCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface BillProduct {
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface BillRecord {
  _id: string;
  originalFileName: string;
  customer: BillCustomer;
  invoiceNumber: string;
  orderId: string;
  date: string;
  products: BillProduct[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'pending' | 'scanned' | 'failed';
  errorMessage?: string;
  createdAt: string;
}

export { getBills as fetchBills } from '@/lib/get-bills';

export function formatBillDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }
  return date.toLocaleString();
}

export function formatCurrency(amount: number, currency = ''): string {
  const symbol = currency || '$';
  return `${symbol}${amount.toFixed(2)}`;
}
