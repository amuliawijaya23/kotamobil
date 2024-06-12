import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { isAxiosError } from 'axios';
import { getVehicleImagesService } from '~/services/vehicleServices';

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
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VehicleState = {
  data: null,
  status: 'idle',
  error: null,
};

export const getVehicleImages = createAsyncThunk(
  'vehicle/getVehicleImages',
  async (id: string, thunkAPI) => {
    try {
      const images = await getVehicleImagesService(id);
      return images;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setVehicleLoading: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.status = action.payload;
    },
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
  extraReducers: (builder) => {
    builder
      .addCase(getVehicleImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getVehicleImages.fulfilled,
        (
          state,
          action: PayloadAction<{ key: string; url: string }[] | undefined>,
        ) => {
          state.status = 'succeeded';
          if (action.payload && state.data) {
            state.data.images = action.payload;
          }
        },
      );
  },
});

export const {
  setVehicleLoading,
  setVehicleData,
  setVehicleImages,
  resetVehicleData,
} = vehicleSlice.actions;
export const getVehicleData = (state: RootState) => state.vehicle.data;
export const getVehicleStatus = (state: RootState) => state.vehicle.status;
export default vehicleSlice.reducer;
