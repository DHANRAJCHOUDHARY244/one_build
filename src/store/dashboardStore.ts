import { create } from 'zustand';

import DashboardApi from '@/api/services/dashboardService';
import { setItem, removeItem } from '@/utils/storage';

import { StorageEnum } from '#/enum';

// Define types for the API response
interface Media {
  media_path: string;
  media_type: string;
  media_category: string;
}

interface User {
  id: number;
  user_name: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  media: Media[];
}

interface Deposit {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface Withdrawal {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface DashboardData {
  users: User[];
  todayDepositSum: number;
  todayWithdrawalSum: number;
  depositSum: string;
  withdrawalSum: string;
  deposit: Deposit[];
  withdrawal: Withdrawal[];
  totalUsers: any;
}

interface DashboardStore {
  dashboardData: DashboardData | null;
  fetchDashboardData: () => Promise<void>;
  clearDashboardData: () => void;
}

// Create the Zustand store
const useDashboardStore = create<DashboardStore>((set) => ({
  dashboardData: null,

  fetchDashboardData: async () => {
    try {
      const response = await DashboardApi(); // Call the Dashboard API service
      const dashboardData = response; // Destructure data from the response

      // Ensure you are setting the correct state key
      set((state) => ({
        ...state,
        dashboardData, // Update the `dashboardData` key in the store
      }));

      // Optionally store the data in local storage
      setItem(StorageEnum.Dashboard, dashboardData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  },

  clearDashboardData: () => {
    set({ dashboardData: null });
    removeItem(StorageEnum.Dashboard);
  },
}));

// Export hooks to access the store
export const useDashboardData = () => useDashboardStore((state) => state.dashboardData);
export const useFetchDashboardData = () => useDashboardStore((state) => state.fetchDashboardData);
export const useClearDashboardData = () => useDashboardStore((state) => state.clearDashboardData);

export default useDashboardStore;
