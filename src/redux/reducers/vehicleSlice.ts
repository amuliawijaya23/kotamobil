import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

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
  bodyType: string;
  fuelType: string;
  taxDate?: Date;
  price: number;
  ownerId: string;
  buyerId?: string;
  dateAdded: Date;
  images?: { key: string; url: string }[];
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
    setVehicleImages: (
      state,
      action: PayloadAction<{ key: string; url: string }[]>,
    ) => {
      if (state.data) {
        state.data.images = action.payload;
      }
    },
    resetVehicleData: () => initialState,
  },
});

export const { setVehicleData, setVehicleImages, resetVehicleData } =
  vehicleSlice.actions;
export const getVehicleData = (state: RootState) => state.vehicle.data;
export default vehicleSlice.reducer;
