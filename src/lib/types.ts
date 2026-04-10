
export interface UserData {
  firstName: string;
  lastName?: string;
  idNumber: string;
  email: string;
  phone: string;
}

export interface PurchaseRecord {
  id: string;
  numbers: string[];
  userData: UserData;
  totalAmount: number;
  timestamp: Date;
  transactionId: string;
}

export interface RaffleState {
  selectedQuantity: number;
  userData: UserData | null;
  status: 'selecting' | 'checkout' | 'processing' | 'success';
  purchaseRecord: PurchaseRecord | null;
}
