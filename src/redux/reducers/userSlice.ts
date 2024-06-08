import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
const LC_USER_DATA = 'LC_USER_DATA';

export interface UserData {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
}

export interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = initialState.data;
      localStorage.removeItem(LC_USER_DATA);
    },
    login: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
    },
  },
});

export const { login, logout } = userSlice.actions;
export const getUserData = (state: RootState) => state.user.data;
export default userSlice.reducer;
