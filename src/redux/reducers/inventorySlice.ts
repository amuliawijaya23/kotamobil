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
          queryData.makes[vehicle.make].models[vehicle.model] = true;
        } else {
          if (!queryData.makes[vehicle.make].models[vehicle.model]) {
            queryData.makes[vehicle.make].models[vehicle.model] = true;
          }
        }
      }
      state.queryData = queryData;
    },
    addVehicleToInventory: (state, action: PayloadAction<VehicleData>) => {
      if (state.data) {
        state.data.unshift(action.payload);
      }
    },
    updateVehicleFromInventory: (state, action: PayloadAction<VehicleData>) => {
      if (state.data) {
        const index = state.data?.findIndex(
          (vehicle) => vehicle._id === action.payload._id,
        );

        if (index !== -1) {
          state.data[index] = action.payload;
        }
      }
    },
    updateMakeSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        state.queryData.makes[action.payload].selected =
          !state.queryData?.makes[action.payload].selected;
      }
    },
    updateModelSelections: (
      state,
      action: PayloadAction<{ make: string; model: string }>,
    ) => {
      if (state.queryData) {
        state.queryData.makes[action.payload.make].models[
          action.payload.model
        ] =
          !state.queryData.makes[action.payload.make].models[
            action.payload.model
          ];
      }
    },
    resetInventory: () => initialState,
  },
});

export const {
  setInventoryData,
  setQueryData,
  addVehicleToInventory,
  updateVehicleFromInventory,
  updateMakeSelections,
  updateModelSelections,
  resetInventory,
} = inventorySlice.actions;
export const getInventory = (state: RootState) => state.inventory.data;
export const getQueryData = (state: RootState) => state.inventory.queryData;
export default inventorySlice.reducer;
