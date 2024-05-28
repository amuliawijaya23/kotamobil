import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface VehicleForm {
  images: File[] | undefined | null;
  name: string;
  status: string;
  dateAdded: Date | null;
  dateSold: Date | null;
  price: string | number | null | undefined;
  marketPrice: string | number | null | undefined;
  purchasePrice: string | number | null | undefined;
  soldPrice: string | number | null | undefined;
  condition: string;
  plateNumber: string;
  taxDate: Date | null;
  vin: string;
  make: string;
  model: string;
  assembly: string;
  year: number | boolean;
  odometer: number | boolean;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
  specification: string[];
}

export interface ContactForm {}

export interface FormAlert {
  message: string;
  severity: string;
}

interface FormState {
  vehicle: VehicleForm;
  contact: ContactForm | null;
  alert: FormAlert | null;
}

const initialState: FormState = {
  vehicle: {
    images: null,
    name: '',
    status: 'Available',
    dateAdded: new Date(Date.now()),
    dateSold: null,
    price: null,
    marketPrice: null,
    purchasePrice: null,
    soldPrice: null,
    condition: 'New',
    plateNumber: '',
    taxDate: null,
    vin: '',
    make: '',
    model: '',
    assembly: 'Complete-Knock-Down',
    year: false,
    odometer: false,
    color: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: '',
    specification: [''],
  },
  contact: null,
  alert: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetVehicleForm: (state) => {
      state.vehicle = initialState.vehicle;
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
    setImages: (state, action: PayloadAction<File[] | null | undefined>) => {
      state.vehicle.images = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.vehicle.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.vehicle.status = action.payload;
    },
    setDateAdded: (state, action: PayloadAction<Date | null>) => {
      state.vehicle.dateAdded = action.payload;
    },
    setDateSold: (state, action: PayloadAction<Date | null>) => {
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
    setTaxDate: (state, action: PayloadAction<Date | null>) => {
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
  },
});

export const {
  resetVehicleForm,
  resetAlert,
  setAlert,
  setImages,
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
  setAssembly,
  setYear,
  setOdometer,
  setColor,
  setTransmission,
  setFuelType,
  setDescription,
  setSpecification,
} = formSlice.actions;
export const getVehicleFormData = (state: RootState) => state.form.vehicle;
export const getFormAlert = (state: RootState) => state.form.alert;
export default formSlice.reducer;
