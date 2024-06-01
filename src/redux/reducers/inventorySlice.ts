import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import type { VehicleData } from './vehicleSlice';

interface QueryData {
  makesModels: { [key: string]: string[] };
  selectedMakes: string[];
  selectedModels: string[];
}

interface InventoryState {
  data: VehicleData[] | null;
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
    setInventoryData: (state, action: PayloadAction<VehicleData[]>) => {
      state.data = action.payload;
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
    setQueryData: (state, action: PayloadAction<VehicleData[]>) => {
      const queryData: QueryData = {
        makesModels: {},
        selectedMakes: [],
        selectedModels: [],
      };
      for (const vehicle of action.payload) {
        if (!queryData.makesModels[vehicle.make]) {
          queryData.makesModels[vehicle.make] = [];
          queryData.selectedMakes.push(vehicle.make);
        }

        if (!queryData.makesModels[vehicle.make].includes(vehicle.model)) {
          queryData.makesModels[vehicle.make].push(vehicle.model);
          queryData.selectedModels.push(vehicle.model);
        }

        Object.keys(queryData.makesModels).forEach((make) => {
          queryData.makesModels[make].sort();
        });
      }
      state.queryData = queryData;
    },
    updateMakeSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const make = action.payload;
        let newSelectedMakes;
        let newSelectedModels;
        if (state.queryData.selectedMakes.includes(make)) {
          newSelectedMakes = state.queryData.selectedMakes.filter(
            (m) => m !== make,
          );
          newSelectedModels = state.queryData.selectedModels.filter(
            (model) =>
              !state.data?.find(
                (vehicle) => vehicle.model === model && vehicle.make === make,
              ),
          );
        } else {
          newSelectedMakes = [...state.queryData.selectedMakes, make];
          const modelsForMake =
            state.data
              ?.filter((item) => item.make === make)
              .map((item) => item.model) || [];
          newSelectedModels = [
            ...new Set([...state.queryData.selectedModels, ...modelsForMake]),
          ];
        }
        state.queryData.selectedMakes = newSelectedMakes;
        state.queryData.selectedModels = newSelectedModels;
      }
    },
    updateModelSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const model = action.payload;
        let newSelectedModels;
        if (state.queryData.selectedModels.includes(model)) {
          newSelectedModels = state.queryData.selectedModels.filter(
            (m) => m !== model,
          );
        } else {
          newSelectedModels = [...state.queryData.selectedModels, model];
        }
        state.queryData.selectedModels = newSelectedModels;
      }
    },
    selectAllMakes: (state) => {
      if (state.queryData) {
        const allMakes = Object.keys(state.queryData.makesModels);
        const allModels = allMakes.reduce<string[]>((acc, make) => {
          return [...acc, ...state.queryData!.makesModels[make]];
        }, []);

        if (state.queryData?.selectedMakes.length === allMakes.length) {
          state.queryData.selectedMakes = [];
          state.queryData.selectedModels = [];
        } else {
          state.queryData.selectedMakes = allMakes;
          state.queryData.selectedModels = allModels;
        }
      }
    },
    selectAllModels: (state) => {
      if (state.queryData) {
        const selectedMakesModels = state.queryData.selectedMakes.reduce<
          string[]
        >((acc, make) => {
          return [...acc, ...state.queryData!.makesModels[make]];
        }, []);

        if (
          selectedMakesModels.length === state.queryData.selectedModels.length
        ) {
          state.queryData.selectedModels = [];
        } else {
          state.queryData.selectedModels = selectedMakesModels;
        }
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
  selectAllMakes,
  selectAllModels,
  resetInventory,
} = inventorySlice.actions;
export const getInventory = (state: RootState) => state.inventory.data;
export const getQueryData = (state: RootState) => state.inventory.queryData;
export default inventorySlice.reducer;
