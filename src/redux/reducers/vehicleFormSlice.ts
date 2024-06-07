import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
  year: number | null;
  odometer: number | null;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
  specification: string[];
  buyerId: string;
}

interface VehicleFormState {
  form: VehicleForm;
}

const initialState: VehicleFormState = {
  form: {
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
    year: null,
    odometer: null,
    color: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    description: '',
    specification: [''],
    buyerId: '',
  },
};

export const vehicleFormSlice = createSlice({
  name: 'vehicleForm',
  initialState,
  reducers: {
    resetVehicleForm: (state) => {
      state.form = initialState.form;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.form.name = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.form.status = action.payload;
    },
    setDateAdded: (state, action: PayloadAction<string>) => {
      state.form.dateAdded = action.payload;
    },
    setDateSold: (state, action: PayloadAction<string>) => {
      state.form.dateSold = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.form.price = action.payload;
    },
    setMarketPrice: (state, action: PayloadAction<number>) => {
      state.form.marketPrice = action.payload;
    },
    setPurchasePrice: (state, action: PayloadAction<number>) => {
      state.form.purchasePrice = action.payload;
    },
    setSoldPrice: (state, action: PayloadAction<number | null>) => {
      state.form.soldPrice = action.payload;
    },
    setCondition: (state, action: PayloadAction<string>) => {
      state.form.condition = action.payload;
    },
    setPlateNumber: (state, action: PayloadAction<string>) => {
      state.form.plateNumber = action.payload;
    },
    setTaxDate: (state, action: PayloadAction<string>) => {
      state.form.taxDate = action.payload;
    },
    setVin: (state, action: PayloadAction<string>) => {
      state.form.vin = action.payload;
    },
    setMake: (state, action: PayloadAction<string>) => {
      state.form.make = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.form.model = action.payload;
    },
    setBodyType: (state, action: PayloadAction<string>) => {
      state.form.bodyType = action.payload;
    },
    setAssembly: (state, action: PayloadAction<string>) => {
      state.form.assembly = action.payload;
    },
    setYear: (state, action: PayloadAction<number>) => {
      state.form.year = action.payload;
    },
    setOdometer: (state, action: PayloadAction<number>) => {
      state.form.odometer = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.form.color = action.payload;
    },
    setTransmission: (state, action: PayloadAction<string>) => {
      state.form.transmission = action.payload;
    },
    setFuelType: (state, action: PayloadAction<string>) => {
      state.form.fuelType = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.form.description = action.payload;
    },
    setSpecification: (state, action: PayloadAction<string[]>) => {
      state.form.specification = action.payload;
    },
    setBuyerId: (state, action: PayloadAction<string>) => {
      state.form.buyerId = action.payload;
    },
  },
});

export const {
  resetVehicleForm,
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
  setBuyerId,
} = vehicleFormSlice.actions;
export const getVehicleFormData = (state: RootState) => state.vehicleForm.form;
export default vehicleFormSlice.reducer;
