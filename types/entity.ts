import { TransactionType, UserStatus } from './enum';
export interface UserToken {
  accessToken?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  admin_type: string;
  active: boolean;
  avatar: string;
  token: string;
}
export interface UsersList {
  id?: number;
  client_id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  wallet: number;
  created_at: string;
  media: any[];
}

export interface FetchUserInfo {
 users:UsersList[];
 paging:Paging;
}

export interface Organization {
  id: string;
  name: string;
  status: 'enable' | 'disable';
  desc?: string;
  order?: number;
  children?: Organization[];
}

export interface User {
  id: string;
  user_name: string;
  email: string;
  password: string;
  referred_by: string;
  transaction_id: string;
  amount: any;
  status: UserStatus;
  phone: string;
}

// Interface for fetching ledgers
export interface LedgerParams {
  type?: TransactionType;
  page?: number;
  page_size?: number;
  month?: any;
  status?: UserStatus;
  search?: string;
}

// Interface for updating ledger deposit request
export interface UpdateLedgerDeposit {
  transaction_id: any;
  status: UserStatus;
}

// Interface for updating ledger withdrawal request
export interface UpdateLedgerWithdraw {
  withdraw_request_id: any;
  status: UserStatus;
}
// Interface for paging details
export interface Paging {
  total: number;
  total_pages: number;
  page_size: number;
  currentPage: number;
}

// Interface for individual ledger entries
export interface Ledger {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    client_id: string;
    user_name: string;
    first_name: string;
    last_name: string;
  };
}
// Interface for individual ledger entries
export interface LedgerResponse {
 users:Ledger[];
 paging:Paging;
}


// Interface for ledger response from the API
export interface LedgerResponse {
  users: Ledger[]; // Changed from ledgerDetails to users to match the API response
  totalAmount: number; // This property is not directly in the provided response; adjust if needed
  paging: Paging; // Matches the "paging" structure in the response
  message: string; // Matches the "message" key in the response
}

// Interface for the Zustand store to manage ledger data
export interface LedgerStore {
  clearLedgerData: any;
  depositData: any;
  withdrawalData: any;
  fetchLedgerData: (ledgerParams?: LedgerParams) => Promise<void>; // Fetch function with optional params
}
interface Media {
  id: number;
  media_path: string;
  media_type: string;
  media_category: string;
  created_at: string;
  updated_at: string;
}

interface UserDetails {
  id: number;
  client_id: string;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  occupation: string | null;
  dob: string;
  nominee_name: string;
  plan: string;
  phone: string;
  wallet: number;
  referral_code: string;
  bank_name: string;
  beneficiary_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
  branch: string | null;
  created_at: string;
  media: Media[];
}

export interface UserReferral {
  id: number;
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  referral_code: string | null;
  created_at: string;
}

export interface UserByIdResponseData {
  user: UserDetails[];
  user_referrals: UserReferral[];
}

// Interface for Withdraw Details API Response
export interface WithdrawDetailsResponse {
    withdraw_details: {
      id: number;
      bank_name: string;
      beneficiary_name: string;
      account_number: string;
      ifsc_code: string;
      branch: string;
      amount: number;
      active: boolean;
      status: string;
      created_at: string;
      updated_at: string;
    };
}

// Interface for Deposit Details API Response
export interface DepositDetailsResponse {
    deposit_details: {
      id: number;
      transaction_id: string;
      amount: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
}

export type BlogPostData = {
  title: string;
  content: string;
  images?: File; // Optional image file
};
