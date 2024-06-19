import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Alert {
  message: string;
  severity: string;
}

export interface AppState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isVerified: boolean;
  alert: Alert | null;
  error: string | null;
}

const initialState: AppState = {
  status: 'idle',
  isVerified: false,
  alert: null,
  error: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.status = action.payload;
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

export const { setAppStatus, setAlert, resetAlert } = appSlice.actions;
export const getAppStatus = (state: RootState) => state.app.status;
export const getAppVerification = (state: RootState) => state.app.isVerified;
export const getAppError = (state: RootState) => state.app.error;
export const getAppAlert = (state: RootState) => state.app.alert;
export default appSlice.reducer;
