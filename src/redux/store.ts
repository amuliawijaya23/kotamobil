import { ThunkAction, configureStore, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import userReducer from './reducers/userSlice';
import themeReducer from './reducers/themeSlice';
import inventoryReducer from './reducers/inventorySlice';
import vehicleReducer from './reducers/vehicleSlice';
import formReducer from './reducers/formSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    inventory: inventoryReducer,
    vehicle: vehicleReducer,
    form: formReducer,
  },
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
