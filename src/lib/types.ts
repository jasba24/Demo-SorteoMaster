
export interface UserData {
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phone: string;
  address: string;
}

export interface PurchaseRecord {
  id: string;
  numbers: number[];
  userData: UserData;
  totalAmount: number;
  timestamp: Date;
  transactionId: string;
}

export interface RaffleState {
  selectedNumbers: number[];
  userData: UserData | null;
  status: 'selecting' | 'checkout' | 'processing' | 'success';
  purchaseRecord: PurchaseRecord | null;
}
