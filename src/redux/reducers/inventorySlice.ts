import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import type { VehicleData } from './vehicleSlice';
import {
  status,
  condition,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/selectData';

export interface QueryData {
  makesModels: { [key: string]: string[] };
  search: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  minOdometer: number;
  maxOdometer: number;
  priceRange: number[];
  yearRange: number[];
  odometerRange: number[];
  selectedStatus: string[];
  selectedMakes: string[];
  selectedModels: string[];
  selectedCondition: string[];
  selectedBodyType: string[];
  selectedAssembly: string[];
  selectedFuelType: string[];
  selectedTransmission: string[];
}

interface InventoryState {
  data: VehicleData[] | null;
  queryData: QueryData | null;
  isLoading: boolean;
}

const initialState: InventoryState = {
  data: null,
  queryData: null,
  isLoading: false,
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
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
          state.data.splice(index, 1);
          state.data.unshift(action.payload);
        }
      }
    },
    setQueryData: (state, action: PayloadAction<QueryData>) => {
      state.queryData = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        state.queryData.search = action.payload;
      }
    },
    updateStatusSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedStatus = action.payload;
        let newSelectedStatus;
        if (state.queryData.selectedStatus.includes(selectedStatus)) {
          newSelectedStatus = state.queryData.selectedStatus.filter(
            (c) => c !== selectedStatus,
          );
        } else {
          newSelectedStatus = [
            ...state.queryData.selectedStatus,
            selectedStatus,
          ];
        }
        state.queryData.selectedStatus = newSelectedStatus;
      }
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
          const modelsForMake = state.queryData.makesModels[make];
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
    updatePriceRange: (state, action: PayloadAction<number[]>) => {
      if (state.queryData) {
        state.queryData.priceRange = action.payload;
      }
    },
    updateYearRange: (state, action: PayloadAction<number[]>) => {
      if (state.queryData) {
        state.queryData.yearRange = action.payload;
      }
    },
    updateOdometerRange: (state, action: PayloadAction<number[]>) => {
      if (state.queryData) {
        state.queryData.odometerRange = action.payload;
      }
    },
    updateConditionSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedCondition = action.payload;
        let newSelectedCondition;
        if (state.queryData.selectedCondition.includes(selectedCondition)) {
          newSelectedCondition = state.queryData.selectedCondition.filter(
            (c) => c !== selectedCondition,
          );
        } else {
          newSelectedCondition = [
            ...state.queryData.selectedCondition,
            selectedCondition,
          ];
        }
        state.queryData.selectedCondition = newSelectedCondition;
      }
    },
    updateAssemblySelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedAssembly = action.payload;
        let newSelectedAssembly;
        if (state.queryData.selectedAssembly.includes(selectedAssembly)) {
          newSelectedAssembly = state.queryData.selectedAssembly.filter(
            (a) => a !== selectedAssembly,
          );
        } else {
          newSelectedAssembly = [
            ...state.queryData.selectedAssembly,
            selectedAssembly,
          ];
        }
        state.queryData.selectedAssembly = newSelectedAssembly;
      }
    },
    updateBodyTypeSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedBodyType = action.payload;
        let newSelectedBodyType;
        if (state.queryData.selectedBodyType.includes(selectedBodyType)) {
          newSelectedBodyType = state.queryData.selectedBodyType.filter(
            (a) => a !== selectedBodyType,
          );
        } else {
          newSelectedBodyType = [
            ...state.queryData.selectedBodyType,
            selectedBodyType,
          ];
        }
        state.queryData.selectedBodyType = newSelectedBodyType;
      }
    },
    updateFuelTypeSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedFuelType = action.payload;
        let newSelectedFuelType;
        if (state.queryData.selectedFuelType.includes(selectedFuelType)) {
          newSelectedFuelType = state.queryData.selectedFuelType.filter(
            (f) => f !== selectedFuelType,
          );
        } else {
          newSelectedFuelType = [
            ...state.queryData.selectedFuelType,
            selectedFuelType,
          ];
        }
        state.queryData.selectedFuelType = newSelectedFuelType;
      }
    },
    updateTransmissionSelections: (state, action: PayloadAction<string>) => {
      if (state.queryData) {
        const selectedTransmission = action.payload;
        let newSelectedTransmission;
        if (
          state.queryData.selectedTransmission.includes(selectedTransmission)
        ) {
          newSelectedTransmission = state.queryData.selectedTransmission.filter(
            (f) => f !== selectedTransmission,
          );
        } else {
          newSelectedTransmission = [
            ...state.queryData.selectedTransmission,
            selectedTransmission,
          ];
        }
        state.queryData.selectedTransmission = newSelectedTransmission;
      }
    },
    selectAllStatus: (state) => {
      if (state.queryData) {
        if (state.queryData.selectedStatus.length === status.length) {
          state.queryData.selectedStatus = [];
        } else {
          state.queryData.selectedStatus = status;
        }
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
    selectAllCondition: (state) => {
      if (state.queryData) {
        if (state.queryData.selectedCondition.length === condition.length) {
          state.queryData.selectedCondition = [];
        } else {
          state.queryData.selectedCondition = condition;
        }
      }
    },
    selectAllAssembly: (state) => {
      if (state.queryData) {
        if (state.queryData.selectedAssembly.length === assembly.length) {
          state.queryData.selectedAssembly = [];
        } else {
          state.queryData.selectedAssembly = assembly;
        }
      }
    },
    selectAllBodyType: (state) => {
      if (state.queryData) {
        if (state.queryData.selectedBodyType.length === bodyType.length) {
          state.queryData.selectedBodyType = [];
        } else {
          state.queryData.selectedBodyType = bodyType;
        }
      }
    },
    selectAllFuelType: (state) => {
      if (state.queryData) {
        if (state.queryData.selectedFuelType.length === fuelType.length) {
          state.queryData.selectedFuelType = [];
        } else {
          state.queryData.selectedFuelType = fuelType;
        }
      }
    },
    selectAllTransmission: (state) => {
      if (state.queryData) {
        if (
          state.queryData.selectedTransmission.length === transmission.length
        ) {
          state.queryData.selectedTransmission = [];
        } else {
          state.queryData.selectedTransmission = transmission;
        }
      }
    },
    resetInventory: () => initialState,
  },
});

export const {
  setInventoryLoading,
  setInventoryData,
  setQueryData,
  addVehicleToInventory,
  updateVehicleFromInventory,
  setSearch,
  updatePriceRange,
  updateYearRange,
  updateOdometerRange,
  updateStatusSelections,
  updateMakeSelections,
  updateModelSelections,
  updateConditionSelections,
  updateAssemblySelections,
  updateBodyTypeSelections,
  updateFuelTypeSelections,
  updateTransmissionSelections,
  selectAllStatus,
  selectAllMakes,
  selectAllModels,
  selectAllCondition,
  selectAllAssembly,
  selectAllBodyType,
  selectAllFuelType,
  selectAllTransmission,
  resetInventory,
} = inventorySlice.actions;
export const getInventory = (state: RootState) => state.inventory.data;
export const getQueryData = (state: RootState) => state.inventory.queryData;
export const getInventoryStatus = (state: RootState) =>
  state.inventory.isLoading;
export default inventorySlice.reducer;
