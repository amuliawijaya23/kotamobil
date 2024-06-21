import type { VehicleSearchParams } from './reducers/inventorySlice';
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { startOfYear, eachMonthOfInterval, subYears } from 'date-fns';
import { setAlert, setAppStatus } from './reducers/appSlice';
import { getContacts, searchContacts } from './reducers/contactsSlice';
import { searchVehicles, getVehicles } from './reducers/inventorySlice';
import { getVehicleImages } from './reducers/vehicleSlice';
import { RootState, AppDispatch } from './store';
import {
  setEndDate,
  setStartDate,
  setMonthsOfInterval,
  getVehicleSales,
  getPastVehicleSales,
  getMonthlyVehicleSales,
  getPastMonthlyVehicleSales,
} from './reducers/dashboardSlice';
import { clearUserData } from './reducers/userSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    const prevUser = previousState.user.data;
    const currentUser = currentState.user.data;

    const notAuthenticated =
      !prevUser && currentUser !== null && currentUser.isVerified;

    const notVerified =
      prevUser !== null &&
      !prevUser.isVerified &&
      currentUser !== null &&
      currentUser.isVerified;

    return notAuthenticated || notVerified;
  },
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setAppStatus('loading'));
    const start = startOfYear(new Date());
    const end = new Date();
    const pastStart = subYears(start, 1);
    const pastEnd = subYears(end, 1);

    listenerApi.dispatch(setStartDate(JSON.stringify(start)));
    listenerApi.dispatch(setEndDate(JSON.stringify(end)));

    try {
      listenerApi.dispatch(getVehicles());
      listenerApi.dispatch(getContacts());
      listenerApi.dispatch(getVehicleSales({ startDate: start, endDate: end }));
      listenerApi.dispatch(
        getPastVehicleSales({ startDate: pastStart, endDate: pastEnd }),
      );

      const monthsOfInterval = eachMonthOfInterval({ start, end });
      const pastMonthsOfInterval = eachMonthOfInterval({
        start: pastStart,
        end: pastEnd,
      });

      listenerApi.dispatch(
        getMonthlyVehicleSales({
          monthsOfInterval: monthsOfInterval,
          startDate: start,
          endDate: end,
        }),
      );
      listenerApi.dispatch(
        getPastMonthlyVehicleSales({
          monthsOfInterval: pastMonthsOfInterval,
          startDate: pastStart,
          endDate: pastEnd,
        }),
      );

      listenerApi.dispatch(
        setMonthsOfInterval(JSON.stringify(monthsOfInterval)),
      );
      listenerApi.dispatch(setAppStatus('succeeded'));
    } catch (error) {
      console.error('Failed to fetch vehicles and contacts', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          listenerApi.dispatch(clearUserData());
        } else {
          listenerApi.dispatch(
            setAlert({
              message: error.response?.data.message,
              severity: 'error',
            }),
          );
        }
      }
      listenerApi.dispatch(setAppStatus('failed'));
    }
  },
});

let dashboardSearchRequest: CancelTokenSource;
listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      (currentState.user.data !== null &&
        previousState.dashboard.startDate !== null &&
        previousState.dashboard.startDate !==
          currentState.dashboard.startDate) ||
      (previousState.dashboard.endDate !== null &&
        previousState.dashboard.endDate !== currentState.dashboard.endDate) ||
      previousState.dashboard.pastRange !== currentState.dashboard.pastRange
    );
  },
  effect: async (_action, listenerApi) => {
    if (dashboardSearchRequest) {
      dashboardSearchRequest.cancel('Search Cancelled');
    }
    dashboardSearchRequest = axios.CancelToken.source();
    const start = JSON.parse(
      listenerApi.getState().dashboard.startDate || '{}',
    );
    const end = JSON.parse(listenerApi.getState().dashboard.endDate || '{}');
    const pastRange = listenerApi.getState().dashboard.pastRange;
    const pastStart = subYears(start, pastRange);
    const pastEnd = subYears(end, pastRange);
    try {
      listenerApi.dispatch(
        getVehicleSales({
          startDate: start,
          endDate: end,
          cancelToken: dashboardSearchRequest.token,
        }),
      );
      listenerApi.dispatch(
        getPastVehicleSales({
          startDate: pastStart,
          endDate: pastEnd,
          cancelToken: dashboardSearchRequest.token,
        }),
      );

      const monthsOfInterval = eachMonthOfInterval({ start, end });
      const pastMonthsOfInterval = eachMonthOfInterval({
        start: pastStart,
        end: pastEnd,
      });

      listenerApi.dispatch(
        getMonthlyVehicleSales({
          monthsOfInterval: monthsOfInterval,
          startDate: start,
          endDate: end,
          cancelToken: dashboardSearchRequest.token,
        }),
      );
      listenerApi.dispatch(
        getPastMonthlyVehicleSales({
          monthsOfInterval: pastMonthsOfInterval,
          startDate: pastStart,
          endDate: pastEnd,
          cancelToken: dashboardSearchRequest.token,
        }),
      );

      listenerApi.dispatch(
        setMonthsOfInterval(JSON.stringify(monthsOfInterval)),
      );
    } catch (error) {
      console.error(`Error fetching dashboard data: ${error}`);
      if (error instanceof AxiosError) {
        listenerApi.dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    }
  },
});

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      previousState.vehicle.data === null &&
      previousState.vehicle.data !== currentState.vehicle.data
    );
  },
  effect: async (_action, listenerApi) => {
    const id = listenerApi.getState().vehicle.data?._id;

    try {
      if (id) {
        listenerApi.dispatch(getVehicleImages(id));
      }
      return;
    } catch (error) {
      console.error('Error fetching vehicle images:', error);
      if (error instanceof AxiosError) {
        listenerApi.dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    }
  },
});

let searchVehiclesRequest: CancelTokenSource;
listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.user.data !== null &&
      previousState.inventory.queryData !== null &&
      previousState.inventory.queryData !== currentState.inventory.queryData
    );
  },
  effect: async (_action, listenerApi) => {
    if (searchVehiclesRequest) {
      searchVehiclesRequest.cancel('Vehicle search cancelled');
    }
    try {
      const queryData = listenerApi.getState().inventory.queryData;

      if (queryData) {
        const params: VehicleSearchParams = {
          search: queryData.search,
          status: queryData.selectedStatus,
          makes: queryData.selectedMakes,
          models: queryData.selectedModels,
          priceRange: queryData.priceRange,
          yearRange: queryData.yearRange,
          odometerRange: queryData.odometerRange,
          condition: queryData.selectedCondition,
          assembly: queryData.selectedAssembly,
          bodyType: queryData.selectedBodyType,
          fuelType: queryData.selectedFuelType,
          transmission: queryData.selectedTransmission,
        };
        searchVehiclesRequest = axios.CancelToken.source();

        listenerApi.dispatch(
          searchVehicles({ params, cancelToken: searchVehiclesRequest.token }),
        );
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Search Cancelled');
        return;
      }
      if (error instanceof AxiosError) {
        listenerApi.dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
      console.error('Error searching for vehicles:', error);
    }
  },
});

let contactSearchRequest: CancelTokenSource;
listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) => {
    return (
      currentState.user.data !== null &&
      previousState.contacts.search !== currentState.contacts.search
    );
  },
  effect: async (_action, listenerApi) => {
    if (contactSearchRequest) {
      contactSearchRequest.cancel('Search cancelled');
    }
    try {
      const search = listenerApi.getState().contacts.search;
      contactSearchRequest = axios.CancelToken.source();
      listenerApi.dispatch(
        searchContacts({ search, cancelToken: contactSearchRequest.token }),
      );
    } catch (error) {
      console.error('Error searching for contacts:', error);
      if (axios.isCancel(error)) {
        console.log('Search Cancelled');
        return;
      }
      if (error instanceof AxiosError) {
        listenerApi.dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    }
  },
});

export default listenerMiddleware;
