import type { VehicleData } from './vehicleSlice';
import { CancelToken } from 'axios';
import { isAxiosError } from 'axios';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  addVehicleService,
  updateVehicleService,
  deleteVehicleService,
  getVehiclesService,
  searchVehiclesService,
} from '~/services/vehicleServices';
import {
  status,
  condition,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/optionsData';
import { transformVehicleData } from '~/helpers';

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

export interface VehicleSearchParams {
  search: string;
  status: string[];
  makes: string[];
  models: string[];
  priceRange: number[];
  yearRange: number[];
  odometerRange: number[];
  condition: string[];
  assembly: string[];
  bodyType: string[];
  fuelType: string[];
  transmission: string[];
}

interface InventoryState {
  vehicles: VehicleData[] | null;
  queryData: QueryData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InventoryState = {
  vehicles: null,
  queryData: null,
  status: 'idle',
  error: null,
};

export const addVehicle = createAsyncThunk(
  'inventory/addVehicle',
  async (formData: FormData, thunkAPI) => {
    try {
      const vehicle = await addVehicleService(formData);
      return vehicle;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const updateVehicle = createAsyncThunk(
  'inventory/updateVehicle',
  async ({ id, formData }: { id: string; formData: FormData }, thunkAPI) => {
    try {
      const vehicle = await updateVehicleService(id, formData);
      return vehicle;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const deleteVehicle = createAsyncThunk(
  'inventory/deleteVehicle',
  async (id: string, thunkAPI) => {
    try {
      await deleteVehicleService(id);
      return id;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const getVehicles = createAsyncThunk(
  'inventory/getVehicles',
  async (_, thunkAPI) => {
    try {
      const vehicles = await getVehiclesService();
      return vehicles;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const searchVehicles = createAsyncThunk(
  'inventory/searchVehicles',
  async (
    {
      params,
      cancelToken,
    }: { params: VehicleSearchParams; cancelToken: CancelToken },
    thunkAPI,
  ) => {
    try {
      const vehicles = await searchVehiclesService(params, cancelToken);
      return vehicles;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  },
);

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setInventoryStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>,
    ) => {
      state.status = action.payload;
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
              !state.vehicles?.find(
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
  extraReducers: (builder) => {
    builder
      .addCase(addVehicle.pending, (state) => {
        state.status === 'loading';
      })
      .addCase(
        addVehicle.fulfilled,
        (state, action: PayloadAction<VehicleData>) => {
          state.status === 'succeeded';
          state.vehicles?.unshift(action.payload);
        },
      )
      .addCase(addVehicle.rejected, (state, action) => {
        state.status === 'failed';
        state.error === (action.payload as string);
      })
      .addCase(updateVehicle.pending, (state) => {
        state.status === 'loading';
      })
      .addCase(
        updateVehicle.fulfilled,
        (state, action: PayloadAction<VehicleData>) => {
          state.status === 'succeeded';
          const index = state.vehicles?.findIndex(
            (vehicle) => vehicle._id === action.payload._id,
          );
          if (index !== undefined && index !== -1) {
            state.vehicles?.splice(index, 1);
            state.vehicles?.unshift(action.payload);
          }
        },
      )
      .addCase(updateVehicle.rejected, (state, action) => {
        state.status === 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteVehicle.pending, (state) => {
        state.status === 'loading';
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.status === 'succeeded';
        const newInventory = state.vehicles?.filter(
          (vehicle) => vehicle._id !== action.payload,
        );
        if (newInventory) {
          state.vehicles = newInventory;
        }
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.status === 'failed';
        state.error = action.payload as string;
      })
      .addCase(getVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        getVehicles.fulfilled,
        (state, action: PayloadAction<VehicleData[]>) => {
          state.status = 'succeeded';
          state.vehicles = action.payload;
          const queryData = transformVehicleData(action.payload);
          state.queryData = queryData;
        },
      )
      .addCase(getVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(searchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        searchVehicles.fulfilled,
        (state, action: PayloadAction<VehicleData[]>) => {
          state.status = 'succeeded';
          state.vehicles = action.payload;
        },
      )
      .addCase(searchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  setInventoryStatus,
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
export const getInventory = (state: RootState) => state.inventory.vehicles;
export const getQueryData = (state: RootState) => state.inventory.queryData;
export const getInventoryStatus = (state: RootState) => state.inventory.status;
export default inventorySlice.reducer;
