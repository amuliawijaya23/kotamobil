import type { CountryType } from '~/helpers/selectData';
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

export interface VehicleForm {
  name: string;
  status: string;
  dateAdded: string;
  dateSold: string;
  price: string | number | null | undefined;
  marketPrice: string | number | null | undefined;
  purchasePrice: string | number | null | undefined;
  soldPrice: string | number | null | undefined;
  condition: string;
  plateNumber: string;
  taxDate: string;
  vin: string;
  make: string;
  model: string;
  bodyType: string;
  assembly: string;
  year: number | boolean;
  odometer: number | boolean;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
  specification: string[];
}

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
  tiktok?: string;
  twitter?: string;
  updateId: string;
}

export interface FormAlert {
  message: string;
  severity: string;
}

interface FormState {
  user: UserForm;
  vehicle: VehicleForm;
  contact: ContactForm;
  alert: FormAlert | null;
}

const initialState: FormState = {
  user: {
    firstName: '',
    lastName: '',
    email: '',
    isValidEmail: false,
    password: '',
    confirmPassword: '',
  },
  vehicle: {
    name: '',
    status: 'Available',
    dateAdded: JSON.stringify(new Date(Date.now())),
    dateSold: '',
    price: null,
    marketPrice: null,
    purchasePrice: null,
    soldPrice: null,
    condition: 'New',
    plateNumber: '',
    taxDate: '',
    vin: '',
    make: '',
    model: '',
    bodyType: '',
    assembly: 'Complete-Knock-Down',
    year: false,
    odometer: false,
    color: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: '',
    specification: [''],
  },
  contact: {
    firstName: '',
    lastName: '',
    country: null,
    mobile: '',
    email: '',
    isValidEmail: false,
    address: '',
    instagram: '',
    facebook: '',
    tiktok: '',
    twitter: '',
    updateId: '',
  },
  alert: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // reducer actions for alert
    resetAlert: (state) => {
      state.alert = initialState.alert;
    },
    setAlert: (
      state,
      action: PayloadAction<{ message: string; severity: string }>,
    ) => {
      state.alert = action.payload;
    },
    // reducer actions for user form
    resetUserForm: (state) => {
      state.user = initialState.user;
    },
    setUserFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName = action.payload;
    },
    setUserLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
      state.user.isValidEmail = validateEmail(action.payload);
    },
    setUserPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setUserConfirmPassword: (state, action: PayloadAction<string>) => {
      state.user.confirmPassword = action.payload;
    },
    // reducer actions for vehicle form
    resetVehicleForm: (state) => {
      state.vehicle = initialState.vehicle;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.vehicle.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.vehicle.status = action.payload;
    },
    setDateAdded: (state, action: PayloadAction<string>) => {
      state.vehicle.dateAdded = action.payload;
    },
    setDateSold: (state, action: PayloadAction<string>) => {
      state.vehicle.dateSold = action.payload;
    },
    setPrice: (state, action: PayloadAction<number | null>) => {
      state.vehicle.price = action.payload;
    },
    setMarketPrice: (state, action: PayloadAction<number | null>) => {
      state.vehicle.marketPrice = action.payload;
    },
    setPurchasePrice: (state, action: PayloadAction<number | null>) => {
      state.vehicle.purchasePrice = action.payload;
    },
    setSoldPrice: (state, action: PayloadAction<number | null>) => {
      state.vehicle.soldPrice = action.payload;
    },
    setCondition: (state, action: PayloadAction<string>) => {
      state.vehicle.condition = action.payload;
    },
    setPlateNumber: (state, action: PayloadAction<string>) => {
      state.vehicle.plateNumber = action.payload;
    },
    setTaxDate: (state, action: PayloadAction<string>) => {
      state.vehicle.taxDate = action.payload;
    },
    setVin: (state, action: PayloadAction<string>) => {
      state.vehicle.vin = action.payload;
    },
    setMake: (state, action: PayloadAction<string>) => {
      state.vehicle.make = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.vehicle.model = action.payload;
    },
    setBodyType: (state, action: PayloadAction<string>) => {
      state.vehicle.bodyType = action.payload;
    },
    setAssembly: (state, action: PayloadAction<string>) => {
      state.vehicle.assembly = action.payload;
    },
    setYear: (state, action: PayloadAction<number | boolean>) => {
      state.vehicle.year = action.payload;
    },
    setOdometer: (state, action: PayloadAction<number | boolean>) => {
      state.vehicle.odometer = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.vehicle.color = action.payload;
    },
    setTransmission: (state, action: PayloadAction<string>) => {
      state.vehicle.transmission = action.payload;
    },
    setFuelType: (state, action: PayloadAction<string>) => {
      state.vehicle.fuelType = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.vehicle.description = action.payload;
    },
    setSpecification: (state, action: PayloadAction<string[]>) => {
      state.vehicle.specification = action.payload;
    },
    // reducer actions for contact form
    resetContactForm: (state) => {
      state.contact = initialState.contact;
    },
    setUpdateId: (state, action: PayloadAction<string>) => {
      state.contact.updateId = action.payload;
    },
    setContactFirstName: (state, action: PayloadAction<string>) => {
      state.contact.firstName = action.payload;
    },
    setContactLastName: (state, action: PayloadAction<string>) => {
      state.contact.lastName = action.payload;
    },
    setCountry: (state, action: PayloadAction<CountryType | null>) => {
      state.contact.country = action.payload;
    },
    setContactMobile: (state, action: PayloadAction<string>) => {
      state.contact.mobile = action.payload;
    },
    setContactEmail: (state, action: PayloadAction<string>) => {
      state.contact.email = action.payload;
      state.contact.isValidEmail = validateEmail(action.payload);
    },
    setContactAddress: (state, action: PayloadAction<string>) => {
      state.contact.address = action.payload;
    },
    setContactInstagram: (state, action: PayloadAction<string>) => {
      state.contact.instagram = action.payload;
    },
    setContactFacebook: (state, action: PayloadAction<string>) => {
      state.contact.facebook = action.payload;
    },
    setContactTwitter: (state, action: PayloadAction<string>) => {
      state.contact.twitter = action.payload;
    },
    setContactTiktok: (state, action: PayloadAction<string>) => {
      state.contact.tiktok = action.payload;
    },
  },
});

export const {
  resetUserForm,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
  setUserConfirmPassword,
  resetVehicleForm,
  resetAlert,
  setAlert,
  setName,
  setStatus,
  setDateAdded,
  setDateSold,
  setPrice,
  setMarketPrice,
  setPurchasePrice,
  setSoldPrice,
  setCondition,
  setPlateNumber,
  setTaxDate,
  setVin,
  setMake,
  setModel,
  setBodyType,
  setAssembly,
  setYear,
  setOdometer,
  setColor,
  setTransmission,
  setFuelType,
  setDescription,
  setSpecification,
  resetContactForm,
  setUpdateId,
  setContactFirstName,
  setContactLastName,
  setCountry,
  setContactMobile,
  setContactEmail,
  setContactAddress,
  setContactInstagram,
  setContactFacebook,
  setContactTwitter,
  setContactTiktok,
} = formSlice.actions;
export const getUserFormData = (state: RootState) => state.form.user;
export const getVehicleFormData = (state: RootState) => state.form.vehicle;
export const getContactFormData = (state: RootState) => state.form.contact;
export const getFormAlert = (state: RootState) => state.form.alert;
export default formSlice.reducer;
