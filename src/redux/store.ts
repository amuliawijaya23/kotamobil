import axios from 'axios';
import {
  ThunkAction,
  configureStore,
  Action,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './reducers/userSlice';
import themeReducer from './reducers/themeSlice';
import contactsReducer from './reducers/contactsSlice';
import inventoryReducer, { setInventoryData } from './reducers/inventorySlice';
import vehicleReducer from './reducers/vehicleSlice';
import formReducer from './reducers/formSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    contacts: contactsReducer,
    inventory: inventoryReducer,
    vehicle: vehicleReducer,
    form: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.inventory.queryData !== previousState.inventory.queryData
    );
  },
  effect: async (_action, listenerApi) => {
    const inventory = await axios.post('/api/vehicle/search', {
      makes: listenerApi.getState().inventory.queryData?.selectedMakes,
      models: listenerApi.getState().inventory.queryData?.selectedModels,
    });
    listenerApi.dispatch(setInventoryData(inventory.data));
  },
});
