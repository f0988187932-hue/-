
export type CustomerRole = 'Landlord' | 'Tenant' | 'Guarantor' | 'Contact' | 'Prospect';
export type CustomerStatus = 'Closed' | 'Developing' | 'Archived';
export type PropertyStatus = 'Available' | 'Rented' | 'Sold' | 'Maintaining';

export interface Property {
  id: string;
  address: string;
  images: string[];
  type: string;
  ownerName: string;
  status: PropertyStatus;
  price: number;
  description: string;
  createdAt: string;
}

export interface ViewingRecord {
  date: string;
  propertyAddress: string;
  feedback: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: CustomerRole;
  status: CustomerStatus;
  relatedProperty?: string;
  source: string;
  createdAt: string;
  viewingCount: number;
  lastViewingStatus: string; // 帶看狀況描述
}

export interface TransactionPart {
  source: string;
  name: string;
  phone: string;
  amount: number;
}

export interface Transaction {
  id: string;
  date: string;
  address: string;
  dealAmount: number;
  parts: TransactionPart[];
  totalIncome: number;
  cumulative: number;
  startDate: string;
  period: string;
  remarks: string;
  agent: string;
}

export interface MonthlyPayment {
  month: number;
  amount: number;
  status: 'Paid' | 'Pending' | 'Empty';
}

export interface RentalProperty {
  id: string;
  address: string;
  contractPeriod: string;
  paymentDay: number;
  remarks: string;
  monthlyRent: number;
  payments: MonthlyPayment[];
}

export interface DeductionItem {
  type: 'Late' | 'Leave' | 'Other';
  reason: string;
  amount: number;
}

export interface PayrollRecord {
  id: string;
  name: string;
  role: string;
  base: number;
  bonus: number;
  deductions: DeductionItem[];
  status: 'Paid' | 'Pending';
}

export interface DataBackup {
  version: string;
  timestamp: string;
  customers: Customer[];
  properties: Property[];
  transactions: Transaction[];
  rentals: RentalProperty[];
}
