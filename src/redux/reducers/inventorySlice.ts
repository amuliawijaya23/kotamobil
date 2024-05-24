import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import type { VehicleData } from './vehicleSlice';

interface QueryData {
  makes: Record<string, { selected: boolean; models: Record<string, boolean> }>;
}

interface InventoryState {
  data: [VehicleData] | null;
  queryData: QueryData | null;
}

const initialState: InventoryState = {
  data: null,
  queryData: null,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryData: (state, action: PayloadAction<[VehicleData]>) => {
      state.data = action.payload;
    },
    setQueryData: (state, action: PayloadAction<[VehicleData]>) => {
      const queryData: QueryData | undefined = { makes: {} };

      for (const vehicle of action.payload) {
        if (!queryData.makes[vehicle.make]) {
          queryData.makes[vehicle.make] = { selected: true, models: {} };
          queryData.makes[vehicle.make].models[vehicle.name] = true;
        } else {
          if (!queryData.makes[vehicle.make].models[vehicle.model]) {
            queryData.makes[vehicle.make].models[vehicle.model] = true;
          }
        }
      }
      state.queryData = queryData;
    },
  },
});

export const { setInventoryData, setQueryData } = inventorySlice.actions;
export const getInventory = (state: RootState) => state.inventory.data;
export const getQueryData = (state: RootState) => state.inventory.queryData;
export default inventorySlice.reducer;
