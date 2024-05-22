import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserData {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
}

export interface UserState {
  isAuthenticated: boolean;
  data: UserData | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<UserData>) => {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getUserData = (state: RootState) => state.user.data;
export default userSlice.reducer;
