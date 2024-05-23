import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { VehicleData } from './vehicleSlice';

interface InventoryState {
  data: [VehicleData] | null;
}

const initialState: InventoryState = {
  data: null,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryData: (state, action: PayloadAction<[VehicleData]>) => {
      state.data = action.payload;
    },
  },
});

export const { setInventoryData } = inventorySlice.actions;
export default inventorySlice.reducer;
