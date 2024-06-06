import type { VehicleData } from './vehicleSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DashboardState {
  salesByModel: { model: string; sale: number }[] | null;
  pastSalesByModel: { model: string; sale: number }[] | null;
  totalSales: number | null;
  pastTotalSales: number | null;
  totalProfit: number | null;
  pastTotalProfit: number | null;
  pastSales: VehicleData[] | null;
  sales: VehicleData[] | null;
  pastSalesPerMonth: number[] | null;
  salesPerMonth: number[] | null;
  pastProfitPerMonth: number[] | null;
  profitPerMonth: number[] | null;
  monthsOfInterval: string | null;
  startDate: string | null;
  endDate: string | null;
  pastRange: number;
  isLoading: boolean;
}

const initialState: DashboardState = {
  salesByModel: null,
  pastSalesByModel: null,
  totalSales: null,
  pastTotalSales: null,
  totalProfit: null,
  pastTotalProfit: null,
  pastSales: null,
  sales: null,
  pastSalesPerMonth: null,
  salesPerMonth: null,
  pastProfitPerMonth: null,
  profitPerMonth: null,
  startDate: null,
  endDate: null,
  pastRange: 1,
  monthsOfInterval: null,
  isLoading: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: () => initialState,
    setDashboardLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setPastRange: (state, action: PayloadAction<number>) => {
      state.pastRange = action.payload;
    },
    setMonthsOfInterval: (state, action: PayloadAction<string>) => {
      state.monthsOfInterval = action.payload;
    },
    setSalesByModel: (
      state,
      action: PayloadAction<{ model: string; sale: number }[]>,
    ) => {
      state.salesByModel = action.payload;
    },
    setPastSalesByModel: (
      state,
      action: PayloadAction<{ model: string; sale: number }[]>,
    ) => {
      state.pastSalesByModel = action.payload;
    },
    setTotalSales: (state, action: PayloadAction<number>) => {
      state.totalSales = action.payload;
    },
    setPastTotalSales: (state, action: PayloadAction<number>) => {
      state.pastTotalSales = action.payload;
    },
    setTotalProfit: (state, action: PayloadAction<number>) => {
      state.totalProfit = action.payload;
    },
    setPastTotalProfit: (state, action: PayloadAction<number>) => {
      state.pastTotalProfit = action.payload;
    },
    setPastSales: (state, action: PayloadAction<VehicleData[]>) => {
      state.pastSales = action.payload;
    },
    setSales: (state, action: PayloadAction<VehicleData[]>) => {
      state.sales = action.payload;
    },
    setPastSalesPerMonth: (state, action: PayloadAction<number[]>) => {
      state.pastSalesPerMonth = action.payload;
    },
    setSalesPerMonth: (state, action: PayloadAction<number[]>) => {
      state.salesPerMonth = action.payload;
    },
    setPastProfitPerMonth: (state, action: PayloadAction<number[]>) => {
      state.pastProfitPerMonth = action.payload;
    },
    setProfitPerMonth: (state, action: PayloadAction<number[]>) => {
      state.profitPerMonth = action.payload;
    },
  },
});

export const {
  resetDashboard,
  setDashboardLoading,
  setStartDate,
  setEndDate,
  setPastRange,
  setMonthsOfInterval,
  setSalesByModel,
  setPastSalesByModel,
  setTotalSales,
  setPastTotalSales,
  setTotalProfit,
  setPastTotalProfit,
  setPastSales,
  setSales,
  setPastSalesPerMonth,
  setSalesPerMonth,
  setPastProfitPerMonth,
  setProfitPerMonth,
} = dashboardSlice.actions;
export const getDashboardStatus = (state: RootState) =>
  state.dashboard.isLoading;
export const getStartDate = (state: RootState) => state.dashboard.startDate;
export const getEndDate = (state: RootState) => state.dashboard.endDate;
export const getPastRange = (state: RootState) => state.dashboard.pastRange;
export const getMonthsOfInterval = (state: RootState) =>
  state.dashboard.monthsOfInterval;
export const getSalesByModel = (state: RootState) =>
  state.dashboard.salesByModel;
export const getPastSalesByModel = (state: RootState) =>
  state.dashboard.pastSalesByModel;
export const getTotalSales = (state: RootState) => state.dashboard.totalSales;
export const getPastTotalSales = (state: RootState) =>
  state.dashboard.pastTotalSales;
export const getTotalProfit = (state: RootState) => state.dashboard.totalProfit;
export const getPastTotalProfit = (state: RootState) =>
  state.dashboard.pastTotalProfit;
export const getSales = (state: RootState) => state.dashboard.sales;
export const getPastSales = (state: RootState) => state.dashboard.pastSales;
export const getSalesPerMonth = (state: RootState) =>
  state.dashboard.salesPerMonth;
export const getPastSalesPerMonth = (state: RootState) =>
  state.dashboard.pastSalesPerMonth;
export const getProfitPerMonth = (state: RootState) =>
  state.dashboard.profitPerMonth;
export const getPastProfitPerMonth = (state: RootState) =>
  state.dashboard.pastProfitPerMonth;
export default dashboardSlice.reducer;
