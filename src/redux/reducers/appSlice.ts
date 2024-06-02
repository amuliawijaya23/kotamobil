import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AppState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AppState = {
  isAuthenticated: false,
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuthenticated, setLoading } = appSlice.actions;
export const getAppStatus = (state: RootState) => state.app;
export default appSlice.reducer;
