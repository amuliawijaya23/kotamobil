import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Alert {
  message: string;
  severity: string;
}

export interface AppState {
  isLoading: boolean;
  alert: Alert | null;
}

const initialState: AppState = {
  isLoading: false,
  alert: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetAlert: (state) => {
      state.alert = initialState.alert;
    },
    setAlert: (
      state,
      action: PayloadAction<{ message: string; severity: string }>,
    ) => {
      state.alert = action.payload;
    },
  },
});

export const { setLoading, setAlert, resetAlert } = appSlice.actions;
export const getAppStatus = (state: RootState) => state.app;
export const getAppAlert = (state: RootState) => state.app.alert;
export default appSlice.reducer;
