import type { VehicleData } from './vehicleSlice';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CancelToken, isAxiosError } from 'axios';
import {
  getMonthlyVehicleSalesService,
  getVehicleSalesService,
} from '~/services/vehicleServices';
import {
  calculateSalesByModel,
  calculateSalesMetrics,
  calculateTotalProfit,
  calculateTotalSales,
} from '~/helpers';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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
  status: 'idle',
  error: null,
};

export const getVehicleSales = createAsyncThunk(
  'dashboard/getVehicleSales',
  async (
    {
      startDate,
      endDate,
      cancelToken,
    }: { startDate: Date; endDate: Date; cancelToken?: CancelToken },
    thunkAPI,
  ) => {
    try {
      const vehicleSales = await getVehicleSalesService(
        startDate,
        endDate,
        cancelToken,
      );
      return vehicleSales;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        thunkAPI.rejectWithValue(error.response.data.message);
      }
      thunkAPI.rejectWithValue('An uknown error occured');
    }
  },
);

export const getPastVehicleSales = createAsyncThunk(
  'dashboard/getPastVehicleSales',
  async (
    {
      startDate,
      endDate,
      cancelToken,
    }: { startDate: Date; endDate: Date; cancelToken?: CancelToken },
    thunkAPI,
  ) => {
    try {
      const vehicleSales = await getVehicleSalesService(
        startDate,
        endDate,
        cancelToken,
      );
      return vehicleSales;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        thunkAPI.rejectWithValue(error.response.data.message);
      }
      thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const getMonthlyVehicleSales = createAsyncThunk(
  'dashboard/getMonthlyVehicleSales',
  async (
    {
      monthsOfInterval,
      startDate,
      endDate,
      cancelToken,
    }: {
      monthsOfInterval: Date[];
      startDate: Date;
      endDate: Date;
      cancelToken?: CancelToken;
    },
    thunkAPI,
  ) => {
    try {
      const monthlyVehicleSales = await getMonthlyVehicleSalesService(
        monthsOfInterval,
        startDate,
        endDate,
        cancelToken,
      );
      return monthlyVehicleSales;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        thunkAPI.rejectWithValue(error.response.data.message);
      }
      thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const getPastMonthlyVehicleSales = createAsyncThunk(
  'dashboard/getPastMonthlyVehicleSales',
  async (
    {
      monthsOfInterval,
      startDate,
      endDate,
      cancelToken,
    }: {
      monthsOfInterval: Date[];
      startDate: Date;
      endDate: Date;
      cancelToken?: CancelToken;
    },
    thunkAPI,
  ) => {
    try {
      const monthlyVehicleSales = await getMonthlyVehicleSalesService(
        monthsOfInterval,
        startDate,
        endDate,
        cancelToken,
      );
      return monthlyVehicleSales;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        thunkAPI.rejectWithValue(error.response.data.message);
      }
      thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: () => initialState,
    clearDashboardData: (state) => {
      state.salesByModel = initialState.salesByModel;
      state.pastSalesByModel = initialState.pastSalesByModel;
      state.totalSales = initialState.totalSales;
      state.pastTotalSales = initialState.pastTotalSales;
      state.totalProfit = initialState.totalProfit;
      state.pastTotalProfit = initialState.pastTotalProfit;
      state.sales = initialState.sales;
      state.pastSales = initialState.pastSales;
      state.salesPerMonth = initialState.salesPerMonth;
      state.pastSalesPerMonth = initialState.pastSalesPerMonth;
      state.profitPerMonth = initialState.profitPerMonth;
      state.pastProfitPerMonth = initialState.pastProfitPerMonth;
      state.monthsOfInterval = initialState.monthsOfInterval;
    },
    setDashboardStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.status = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getVehicleSales.fulfilled,
        (state, action: PayloadAction<VehicleData[] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.sales = action.payload;
            state.salesByModel = calculateSalesByModel(action.payload);
          }
        },
      )
      .addCase(getVehicleSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getPastVehicleSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getPastVehicleSales.fulfilled,
        (state, action: PayloadAction<VehicleData[] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            state.pastSales = action.payload;
            state.pastSalesByModel = calculateSalesByModel(action.payload);
          }
        },
      )
      .addCase(getPastVehicleSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getMonthlyVehicleSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getMonthlyVehicleSales.fulfilled,
        (state, action: PayloadAction<VehicleData[][] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            const { numOfSalesPerMonth, profitPerMonth } =
              calculateSalesMetrics(action.payload);
            state.salesPerMonth = numOfSalesPerMonth;
            state.profitPerMonth = profitPerMonth;
            state.totalSales = calculateTotalSales(numOfSalesPerMonth);
            state.totalProfit = calculateTotalProfit(profitPerMonth);
          }
        },
      )
      .addCase(getMonthlyVehicleSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getPastMonthlyVehicleSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getPastMonthlyVehicleSales.fulfilled,
        (state, action: PayloadAction<VehicleData[][] | undefined>) => {
          state.status = 'succeeded';
          if (action.payload) {
            const { numOfSalesPerMonth, profitPerMonth } =
              calculateSalesMetrics(action.payload);
            state.pastSalesPerMonth = numOfSalesPerMonth;
            state.pastProfitPerMonth = profitPerMonth;
            state.pastTotalSales = calculateTotalSales(numOfSalesPerMonth);
            state.pastTotalProfit = calculateTotalProfit(profitPerMonth);
          }
        },
      )
      .addCase(getPastMonthlyVehicleSales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  resetDashboard,
  clearDashboardData,
  setDashboardStatus,
  setStartDate,
  setEndDate,
  setPastRange,
  setMonthsOfInterval,
} = dashboardSlice.actions;
export const getDashboardStatus = (state: RootState) => state.dashboard.status;
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
