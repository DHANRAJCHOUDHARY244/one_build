import { create } from 'zustand';

import { GetAllLedgers } from '@/api/services/ledgerService';
import { setItem, removeItem } from '@/utils/storage';

import { LedgerParams, LedgerResponse, LedgerStore } from '#/entity';
import { StorageEnum, TransactionType } from '#/enum';

// Define the Zustand store
const useLedgerStore = create<LedgerStore>((set) => ({
  withdrawalData: null, // State for withdrawal ledger data
  depositData: null, // State for deposit ledger data

  fetchLedgerData: async (ledgerParams: LedgerParams = {}) => {
    try {
      const response = await GetAllLedgers(ledgerParams); // Call the Ledger API service
      const {
        users: ledgerDetails, // Users data based on the type (withdrawal or deposit)
        paging,
        message,
      }: LedgerResponse = response;

      const totalAmount = ledgerDetails.reduce((total, ledger) => total + ledger.amount, 0); // Calculate total amount

      if (ledgerParams.type === TransactionType.WITHDRAWAL) {
        // Store withdrawal data
        set((state) => ({
          ...state,
          withdrawalData: {
            users: ledgerDetails,
            totalAmount,
            paging,
            message,
          },
        }));

        // Optionally store in local storage
        setItem(StorageEnum.LedgerWithdrawal, {
          users: ledgerDetails,
          totalAmount,
          paging,
          message,
        });
      } else if (ledgerParams.type === TransactionType.DEPOSIT) {
        // Store deposit data
        set((state) => ({
          ...state,
          depositData: {
            users: ledgerDetails,
            totalAmount,
            paging,
            message,
          },
        }));

        // Optionally store in local storage
        setItem(StorageEnum.LedgerDeposit, {
          users: ledgerDetails,
          totalAmount,
          paging,
          message,
        });
      }
    } catch (error) {
      console.error('Error fetching ledger data:', error);
    }
  },

  clearLedgerData: (type: string) => {
    if (type === 'Withdrawal') {
      set({ withdrawalData: null });
      removeItem(StorageEnum.LedgerWithdrawal);
    } else if (type === 'Deposit') {
      set({ depositData: null });
      removeItem(StorageEnum.LedgerDeposit);
    }
  },
}));

// Export hooks to access the store
export const useWithdrawalData = () => useLedgerStore((state) => state.withdrawalData);
export const useDepositData = () => useLedgerStore((state) => state.depositData);
export const useFetchLedgerData = () => useLedgerStore((state) => state.fetchLedgerData);
export const useClearLedgerData = () => useLedgerStore((state) => state.clearLedgerData);

export default useLedgerStore;
