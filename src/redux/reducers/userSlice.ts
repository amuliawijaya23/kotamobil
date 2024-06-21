import { isAxiosError } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  loginService,
  registerService,
  logoutService,
  verifyService,
  checkSessionService,
  resendVerificationLinkService,
} from '~/services/userService';

const LC_USER_DATA = 'LC_USER_DATA';

export interface UserData {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  picture?: string;
  isVerified: boolean;
  verificationToken?: string;
}

export interface UserState {
  data: UserData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle',
  isAuthenticated: false,
  error: null,
};

export const checkSession = createAsyncThunk(
  'user/checkSession',
  async (_, thunkAPI) => {
    try {
      const user = await checkSessionService();
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

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

export const verifyUser = createAsyncThunk(
  'user/verify',
  async (id: string, thunkAPI) => {
    try {
      const user = await verifyService(id);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const resendVerificationLink = createAsyncThunk(
  'user/resendVerificationLink',
  async (userId: string, thunkAPI) => {
    try {
      const data = resendVerificationLinkService(userId);
      return data;
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
        const user = JSON.parse(storedUserData);
        state.data = user;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      } else {
        state.status = 'idle';
      }
    },
    clearUserData: (state) => {
      localStorage.removeItem(LC_USER_DATA);
      state.status = 'idle';
      state.data = null;
    },
    clearUserError: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        checkSession.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'succeeded';
          state.data = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
        },
      )
      .addCase(checkSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.data = null;
        state.isAuthenticated = false;
        localStorage.removeItem(LC_USER_DATA);
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'succeeded';
          state.data = action.payload;
          state.isAuthenticated = true;
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
          state.status = 'succeeded';
          state.data = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(resendVerificationLink.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resendVerificationLink.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(resendVerificationLink.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(verifyUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        verifyUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.status = 'succeeded';
          state.data = action.payload;
          state.isAuthenticated = true;
          localStorage.setItem(LC_USER_DATA, JSON.stringify(action.payload));
        },
      )
      .addCase(verifyUser.rejected, (state, action) => {
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

export const { initializeUser, clearUserData, clearUserError } =
  userSlice.actions;
export const getUserData = (state: RootState) => state.user.data;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserisAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getUserError = (state: RootState) => state.user.error;
export default userSlice.reducer;
