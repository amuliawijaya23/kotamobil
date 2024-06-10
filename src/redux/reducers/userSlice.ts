import { isAxiosError } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  loginService,
  registerService,
  logoutService,
} from '~/services/userService';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const user = await loginService(email, password);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: Partial<UserData>, thunkAPI) => {
    try {
      const user = await registerService(userData);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await logoutService();
      return;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state) => {
      const storedUserData = localStorage.getItem(LC_USER_DATA);
      if (storedUserData) {
        state.data = JSON.parse(storedUserData);
        state.status = 'succeeded';
      } else {
        state.status = 'idle';
      }
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'succeeded';
          state.data = action.payload;
          localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          console.log('Succeeds!');
          state.status = 'succeeded';
          state.data = action.payload;
          localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.data = null;
        localStorage.removeItem(LC_USER_DATA);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { initializeUser, clearUserError } = userSlice.actions;
export const getUserData = (state: RootState) => state.user.data;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;
export default userSlice.reducer;
