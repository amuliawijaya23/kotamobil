import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VehicleData {
  _id: string;
  name: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  sold: boolean;
  odometer: number;
  color: string;
  condition: string;
  assembly: string;
  transmission: string;
  fuelType: string;
  taxDate?: Date;
  price: number;
  ownerId: string;
  dateAdded: Date;
  images?: [string];
  plateNumber?: string;
  specification?: [string];
  description?: string;
  creditPrice?: number;
  marketPrice?: number;
  purchasePrice?: number;
  soldPrice?: number;
  dateSold?: Date;
}

interface VehicleState {
  data: VehicleData | null;
}

const initialState: VehicleState = {
  data: null,
};

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicleData: (state, action: PayloadAction<VehicleData>) => {
      state.data = action.payload;
    },
  },
});

export const { setVehicleData } = vehicleSlice.actions;
export default vehicleSlice.reducer;
