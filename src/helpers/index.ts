import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import type { QueryData } from '~/redux/reducers/inventorySlice';
import {
  condition,
  assembly,
  bodyType,
  fuelType,
  transmission,
  status,
} from './optionsData';

export type Order = 'asc' | 'desc';

export const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    ? true
    : false;
};

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: Order, orderBy: string) {
  return order === 'desc'
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) => descendingComparator(a, b, orderBy)
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const transformVehicleData = (vehicles: VehicleData[]): QueryData => {
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

export const calculateSalesByModel = (sales: VehicleData[]) => {
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

export const calculateSalesMetrics = (salesPerMonth: VehicleData[][]) => {
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

export const calculateTotalSales = (numOfSalesPerMonth: number[]) => {
  return numOfSalesPerMonth.reduce((acc, a) => acc + a);
};

export const calculateTotalProfit = (profitPerMonth: number[]) => {
  return profitPerMonth.reduce((acc: number, a: number) => acc + a);
};
