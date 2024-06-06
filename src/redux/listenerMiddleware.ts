import axios, { CancelTokenSource } from 'axios';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  startOfYear,
  endOfMonth,
  eachMonthOfInterval,
  subYears,
} from 'date-fns';
import { setLoading } from './reducers/appSlice';
import { setContactsData } from './reducers/contactsSlice';
import {
  QueryData,
  setInventoryData,
  setInventoryLoading,
  setQueryData,
} from './reducers/inventorySlice';
import {
  VehicleData,
  setVehicleImages,
  setVehicleLoading,
} from './reducers/vehicleSlice';
import { RootState, AppDispatch } from './store';
import {
  setEndDate,
  setStartDate,
  setMonthsOfInterval,
  setPastProfitPerMonth,
  setPastSales,
  setPastSalesPerMonth,
  setProfitPerMonth,
  setSales,
  setSalesPerMonth,
  setTotalSales,
  setPastTotalSales,
  setTotalProfit,
  setPastTotalProfit,
  setSalesByModel,
  setPastSalesByModel,
} from './reducers/dashboardSlice';
import {
  status,
  condition,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/selectData';

const listenerMiddleware = createListenerMiddleware();

const fetchVehiclesAndContacts = async () => {
  return Promise.all([axios.get('/api/vehicle'), axios.get('/api/contact')]);
};

const transformVehicleData = (vehicles: VehicleData[]): QueryData => {
  const queryData: QueryData = {
    makesModels: {},
    search: '',
    selectedMakes: [],
    selectedModels: [],
    minPrice: Infinity,
    maxPrice: -Infinity,
    minYear: Infinity,
    maxYear: -Infinity,
    minOdometer: Infinity,
    maxOdometer: -Infinity,
    priceRange: [],
    yearRange: [],
    odometerRange: [],
    selectedStatus: status,
    selectedCondition: condition,
    selectedBodyType: bodyType,
    selectedAssembly: assembly,
    selectedFuelType: fuelType,
    selectedTransmission: transmission,
  };

  for (const vehicle of vehicles) {
    if (!queryData.makesModels[vehicle.make]) {
      queryData.makesModels[vehicle.make] = [];
      queryData.selectedMakes.push(vehicle.make);
    }

    if (!queryData.makesModels[vehicle.make].includes(vehicle.model)) {
      queryData.makesModels[vehicle.make].push(vehicle.model);
      queryData.selectedModels.push(vehicle.model);
    }

    if (vehicle.price < queryData.minPrice) {
      queryData.minPrice = vehicle.price;
      queryData.priceRange[0] = vehicle.price;
    }

    if (vehicle.price > queryData.maxPrice) {
      queryData.maxPrice = vehicle.price;
      queryData.priceRange[1] = vehicle.price;
    }

    if (vehicle.year < queryData.minYear) {
      queryData.minYear = vehicle.year;
      queryData.yearRange[0] = vehicle.year;
    }

    if (vehicle.year > queryData.maxYear) {
      queryData.maxYear = vehicle.year;
      queryData.yearRange[1] = vehicle.year;
    }

    if (vehicle.odometer < queryData.minOdometer) {
      queryData.minOdometer = vehicle.odometer;
      queryData.odometerRange[0] = vehicle.odometer;
    }

    if (vehicle.odometer > queryData.maxOdometer) {
      queryData.maxOdometer = vehicle.odometer;
      queryData.odometerRange[1] = vehicle.odometer;
    }

    Object.keys(queryData.makesModels).forEach((make) => {
      queryData.makesModels[make].sort();
    });
  }

  return queryData;
};

const fetchAllSalesData = async (startDate: Date, endDate: Date) => {
  return axios.post('/api/vehicle/sales', { startDate, endDate });
};

const calculateSalesByModel = (sales: VehicleData[]) => {
  const salesByModel = sales.reduce<{ [key: string]: number }>(
    (acc, sale: VehicleData) => {
      const model = sale.model;
      if (!acc[model]) {
        acc[model] = 0;
      }
      acc[model]++;
      return acc;
    },
    {},
  );

  return Object.keys(salesByModel).map((model) => ({
    model,
    sale: salesByModel[model],
  }));
};

const fetchMonthlySalesData = async (
  monthsOfInterval: Date[],
  startDate: Date,
  endDate: Date,
) => {
  const responses = await Promise.all(
    monthsOfInterval.map((month, index) => {
      const startOfMonth = index === 0 ? new Date(startDate) : month;
      const endOfMonthDate =
        index === monthsOfInterval.length - 1
          ? new Date(endDate)
          : endOfMonth(new Date(month));
      return axios.post('/api/vehicle/sales', {
        startDate: startOfMonth,
        endDate: endOfMonthDate,
      });
    }),
  );
  return responses.map((response) => response.data);
};

const calculateSalesMetrics = (salesPerMonth: VehicleData[][]) => {
  const numOfSalesPerMonth = salesPerMonth.map(
    (salesOfMonth) => salesOfMonth.length,
  );
  const profitPerMonth = salesPerMonth.map((salesOfMonth) =>
    salesOfMonth.length === 0
      ? 0
      : salesOfMonth
          .map(
            (sale: VehicleData) =>
              sale.soldPrice! - (sale.purchasePrice || sale.price),
          )
          .reduce((acc: number, a: number) => acc + a, 0),
  );
  return { numOfSalesPerMonth, profitPerMonth };
};

const calculateTotalSales = (numOfSalesPerMonth: number[]) => {
  return numOfSalesPerMonth.reduce((acc, a) => acc + a);
};

const calculateTotalProfit = (profitPerMonth: number[]) => {
  return profitPerMonth.reduce((acc: number, a: number) => acc + a);
};

listenerMiddleware.startListening.withTypes<RootState, AppDispatch>()({
  predicate: (_action, currentState, previousState) =>
    !previousState.app.isAuthenticated && currentState.app.isAuthenticated,
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(setLoading(true));
    const start = startOfYear(new Date());
    const end = new Date();
    const pastStart = subYears(start, 1);
    const pastEnd = subYears(end, 1);

    listenerApi.dispatch(setStartDate(JSON.stringify(start)));
    listenerApi.dispatch(setEndDate(JSON.stringify(end)));

    try {
      const [vehiclesAndContactsResponse, salesResponse, pastSalesResponse] =
        await Promise.all([
          fetchVehiclesAndContacts(),
          fetchAllSalesData(start, end),
          fetchAllSalesData(pastStart, pastEnd),
        ]);

      const vehicles = vehiclesAndContactsResponse[0].data;
      const contacts = vehiclesAndContactsResponse[1].data;
      const queryData = transformVehicleData(vehicles);
      const sales = salesResponse.data;
      const pastSales = pastSalesResponse.data;
      const salesByModel = calculateSalesByModel(sales);
      const pastSalesByModel = calculateSalesByModel(pastSales);

      const monthsOfInterval = eachMonthOfInterval({ start, end });
      const pastMonthsOfInterval = eachMonthOfInterval({
        start: pastStart,
        end: pastEnd,
      });

      const [salesPerMonth, pastSalesPerMonth] = await Promise.all([
        fetchMonthlySalesData(monthsOfInterval, start, end),
        fetchMonthlySalesData(pastMonthsOfInterval, pastStart, pastEnd),
      ]);

      const { numOfSalesPerMonth, profitPerMonth } =
        calculateSalesMetrics(salesPerMonth);

      const {
        numOfSalesPerMonth: numOfPastSalesPerMonth,
        profitPerMonth: pastProfitPerMonth,
      } = calculateSalesMetrics(pastSalesPerMonth);

      const totalSales = calculateTotalSales(numOfSalesPerMonth);
      const pastTotalSales = calculateTotalSales(numOfPastSalesPerMonth);
      const totalProfit = calculateTotalProfit(profitPerMonth);
      const pastTotalProfit = calculateTotalProfit(pastProfitPerMonth);

      listenerApi.dispatch(
        setMonthsOfInterval(JSON.stringify(monthsOfInterval)),
      );
      listenerApi.dispatch(setInventoryData(vehicles));
      listenerApi.dispatch(setQueryData(queryData));
      listenerApi.dispatch(setContactsData(contacts));
      listenerApi.dispatch(setTotalSales(totalSales));
      listenerApi.dispatch(setSalesByModel(salesByModel));
      listenerApi.dispatch(setPastSalesByModel(pastSalesByModel));
      listenerApi.dispatch(setPastTotalSales(pastTotalSales));
      listenerApi.dispatch(setTotalProfit(totalProfit));
      listenerApi.dispatch(setPastTotalProfit(pastTotalProfit));
      listenerApi.dispatch(setSales(sales));
      listenerApi.dispatch(setPastSales(pastSales));
      listenerApi.dispatch(setSalesPerMonth(numOfSalesPerMonth));
      listenerApi.dispatch(setProfitPerMonth(profitPerMonth));
      listenerApi.dispatch(setPastSalesPerMonth(numOfPastSalesPerMonth));
      listenerApi.dispatch(setPastProfitPerMonth(pastProfitPerMonth));
    } catch (error) {
      console.error('Failed to fetch vehicles and contacts', error);
    } finally {
      listenerApi.dispatch(setLoading(false));
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
    listenerApi.dispatch(setVehicleLoading(true));
    try {
      const { data } = await axios.get(`/api/vehicle/images/${id}`);
      if (data && data.length > 0) {
        listenerApi.dispatch(setVehicleImages(data));
      }
      return;
    } catch (error) {
      console.error('Error fetching vehicle images:', error);
    } finally {
      listenerApi.dispatch(setVehicleLoading(false));
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
      const status = queryData?.selectedStatus;
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
          status: status,
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

export default listenerMiddleware;
