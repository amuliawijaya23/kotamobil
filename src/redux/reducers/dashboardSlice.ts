import type { VehicleData } from './vehicleSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface DashboardState {
  pastSales: VehicleData[] | null;
  sales: VehicleData[] | null;
  pastSalesPerMonth: number[] | null;
  salesPerMonth: number[] | null;
  pastProfitPerMonth: number[] | null;
  profitPerMonth: number[] | null;
  startDate: string | null;
  endDate: string | null;
  monthsOfInterval: string | null;
}

const initialState: DashboardState = {
  pastSales: null,
  sales: null,
  pastSalesPerMonth: null,
  salesPerMonth: null,
  pastProfitPerMonth: null,
  profitPerMonth: null,
  startDate: null,
  endDate: null,
  monthsOfInterval: null,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: () => initialState,
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setMonthsOfInterval: (state, action: PayloadAction<string>) => {
      state.monthsOfInterval = action.payload;
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
  setStartDate,
  setEndDate,
  setMonthsOfInterval,
  setPastSales,
  setSales,
  setPastSalesPerMonth,
  setSalesPerMonth,
  setPastProfitPerMonth,
  setProfitPerMonth,
} = dashboardSlice.actions;
export const getStartDate = (state: RootState) => state.dashboard.startDate;
export const getEndDate = (state: RootState) => state.dashboard.endDate;
export const getMonthsOfInterval = (state: RootState) =>
  state.dashboard.monthsOfInterval;
export const getSalesData = (state: RootState) => state.dashboard.sales;
export const getPastSalesData = (state: RootState) => state.dashboard.pastSales;
export const getSalesPerMonth = (state: RootState) =>
  state.dashboard.salesPerMonth;
export const getPastSalesPerMonth = (state: RootState) =>
  state.dashboard.pastSalesPerMonth;
export const getProfitPerMonth = (state: RootState) =>
  state.dashboard.profitPerMonth;
export const getPastProfitPerMonth = (state: RootState) =>
  state.dashboard.pastProfitPerMonth;
export default dashboardSlice.reducer;
