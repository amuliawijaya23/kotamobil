import axios, { CancelTokenSource } from 'axios';
import {
  ThunkAction,
  configureStore,
  Action,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer, { setLoading } from './reducers/appSlice';
import userReducer from './reducers/userSlice';
import themeReducer from './reducers/themeSlice';
import contactsReducer, { setContactsData } from './reducers/contactsSlice';
import inventoryReducer, {
  setInventoryData,
  setInventoryLoading,
  setQueryData,
} from './reducers/inventorySlice';
import vehicleReducer from './reducers/vehicleSlice';
import authFormReducer from './reducers/authFormSlice';
import vehicleFormReducer from './reducers/vehicleFormSlice';
import contactFormReducer from './reducers/contactFormSlice';

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    theme: themeReducer,
    contacts: contactsReducer,
    inventory: inventoryReducer,
    vehicle: vehicleReducer,
    authForm: authFormReducer,
    vehicleForm: vehicleFormReducer,
    contactForm: contactFormReducer,
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
      previousState.app.isAuthenticated === false &&
      currentState.app.isAuthenticated === true
    );
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setLoading(true));
    try {
      const [vehicles, contacts] = await Promise.all([
        axios.get('/api/vehicle'),
        axios.get('/api/contact'),
      ]);

      if (vehicles.status === 200 && vehicles.data.length > 0) {
        listenerApi.dispatch(setInventoryData(vehicles.data));
        listenerApi.dispatch(setQueryData(vehicles.data));
      }

      if (contacts.status === 200 && contacts.data.length > 0) {
        listenerApi.dispatch(setContactsData(contacts.data));
      }
    } catch (error) {
      console.error('Failed to fetch vehicles and contacts', error);
    } finally {
      listenerApi.dispatch(setLoading(false));
    }
  },
});

let vehicleSearchRequest: CancelTokenSource;
listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      previousState.inventory.queryData !== null &&
      previousState.inventory.queryData !== currentState.inventory.queryData
    );
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setInventoryLoading(true));
    if (vehicleSearchRequest) {
      vehicleSearchRequest.cancel('Search Cancelled');
    }
    try {
      const queryData = listenerApi.getState().inventory.queryData;
      const search = queryData?.search;
      const makes = queryData?.selectedMakes;
      const models = queryData?.selectedModels;
      const priceRange = queryData?.priceRange;
      const yearRange = queryData?.yearRange;
      const odometerRange = queryData?.odometerRange;
      const condition = queryData?.selectedCondition;
      const assembly = queryData?.selectedAssembly;
      const bodyType = queryData?.selectedBodyType;
      const fuelType = queryData?.selectedFuelType;
      const transmission = queryData?.selectedTransmission;
      vehicleSearchRequest = axios.CancelToken.source();
      const inventory = await axios.post(
        '/api/vehicle/search',
        {
          search: search,
          makes: makes,
          models: models,
          priceRange: priceRange,
          yearRange: yearRange,
          odometerRange: odometerRange,
          condition: condition,
          assembly: assembly,
          bodyType: bodyType,
          fuelType: fuelType,
          transmission: transmission,
        },
        { cancelToken: vehicleSearchRequest.token },
      );
      listenerApi.dispatch(setInventoryData(inventory.data));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Search Cancelled');
        return;
      }
      console.error('Error searching for vehicles:', error);
    } finally {
      listenerApi.dispatch(setInventoryLoading(false));
    }
  },
});

let contactSearchRequest: CancelTokenSource;
listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return previousState.contacts.search !== currentState.contacts.search;
  },
  effect: async (_action, listenerApi) => {
    if (contactSearchRequest) {
      contactSearchRequest.cancel('Search cancelled');
    }
    try {
      const search = listenerApi.getState().contacts.search;
      contactSearchRequest = axios.CancelToken.source();
      const contacts = await axios.post(
        '/api/contact/search',
        { search },
        { cancelToken: contactSearchRequest.token },
      );
      listenerApi.dispatch(setContactsData(contacts.data));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Search Cancelled');
        return;
      }
      console.error('Error searching for contacts:', error);
    }
  },
});
