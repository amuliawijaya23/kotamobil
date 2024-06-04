import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { CountryType } from '~/helpers/selectData';
import { validateEmail } from '~/helpers';

export interface ContactForm {
  firstName: string;
  lastName?: string;
  country: CountryType | null;
  mobile: string;
  email?: string;
  isValidEmail: boolean;
  address?: string;
  instagram?: string;
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
  updateId: string;
}

interface VehicleFormState {
  form: ContactForm;
}

const initialState: VehicleFormState = {
  form: {
    firstName: '',
    lastName: '',
    country: null,
    mobile: '',
    email: '',
    isValidEmail: false,
    address: '',
    instagram: '',
    facebook: '',
    linkedIn: '',
    twitter: '',
    updateId: '',
  },
};

export const contactFormSlice = createSlice({
  name: 'contactForm',
  initialState,
  reducers: {
    resetContactForm: (state) => {
      state.form = initialState.form;
    },
    setUpdateId: (state, action: PayloadAction<string>) => {
      state.form.updateId = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.form.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.form.lastName = action.payload;
    },
    setCountry: (state, action: PayloadAction<CountryType | null>) => {
      state.form.country = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.form.mobile = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.form.email = action.payload;
      state.form.isValidEmail = validateEmail(action.payload);
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.form.address = action.payload;
    },
    setInstagram: (state, action: PayloadAction<string>) => {
      state.form.instagram = action.payload;
    },
    setFacebook: (state, action: PayloadAction<string>) => {
      state.form.facebook = action.payload;
    },
    setTwitter: (state, action: PayloadAction<string>) => {
      state.form.twitter = action.payload;
    },
    setLinkedIn: (state, action: PayloadAction<string>) => {
      state.form.linkedIn = action.payload;
    },
  },
});

export const {
  resetContactForm,
  setUpdateId,
  setFirstName,
  setLastName,
  setEmail,
  setCountry,
  setMobile,
  setAddress,
  setInstagram,
  setFacebook,
  setTwitter,
  setLinkedIn,
} = contactFormSlice.actions;
export const getContactFormData = (state: RootState) => state.contactForm.form;
export default contactFormSlice.reducer;
