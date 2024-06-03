import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { validateEmail } from '~/helpers';

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  isValidEmail: boolean;
  password: string;
  confirmPassword: string;
}

interface UserFormState {
  user: UserForm;
  error: string;
}

const initialState: UserFormState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    isValidEmail: false,
    password: '',
    confirmPassword: '',
  },
  error: '',
};

export const authFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = initialState.error;
    },
    resetAuthForm: (state) => {
      state.user = initialState.user;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.user.isValidEmail = validateEmail(action.payload);
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.user.confirmPassword = action.payload;
    },
  },
});

export const {
  resetError,
  resetAuthForm,
  setError,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
} = authFormSlice.actions;
export const getAuthFormData = (state: RootState) => state.authForm.user;
export const getAuthFormError = (state: RootState) => state.authForm.error;
export default authFormSlice.reducer;
