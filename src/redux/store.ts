import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import appReducer from './reducers/appSlice';
import userReducer from './reducers/userSlice';
import themeReducer from './reducers/themeSlice';
import contactsReducer from './reducers/contactsSlice';
import inventoryReducer from './reducers/inventorySlice';
import vehicleReducer from './reducers/vehicleSlice';
import vehicleFormReducer from './reducers/vehicleFormSlice';
import contactFormReducer from './reducers/contactFormSlice';
import dashboardReducer from './reducers/dashboardSlice';
import listenerMiddleware from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
    contacts: contactsReducer,
    inventory: inventoryReducer,
    vehicle: vehicleReducer,
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
