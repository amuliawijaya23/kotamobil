import type { VehicleSearchParams } from '~/redux/reducers/inventorySlice';
import axios, { CancelToken } from 'axios';
import { VehicleData } from '~/redux/reducers/vehicleSlice';
import { endOfMonth } from 'date-fns';
const API_URL = '/api/vehicle';

export const addVehicleService = async (
  formData: FormData,
): Promise<VehicleData> => {
  const response = await axios.post(`${API_URL}/add`, formData);
  return response.data;
};

export const updateVehicleService = async (
  id: string,
  formData: FormData,
): Promise<VehicleData> => {
  const response = await axios.post(`${API_URL}/update/${id}`, formData);
  return response.data;
};

export const deleteVehicleService = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/delete/${id}`);
};

export const getVehicleImagesService = async (
  id: string,
): Promise<{ key: string; url: string }[]> => {
  const response = await axios.get(`${API_URL}/images/${id}`);
  return response.data;
};

export const getVehiclesService = async (): Promise<VehicleData[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getVehicleSalesService = async (
  startDate: Date,
  endDate: Date,
  cancelToken?: CancelToken,
): Promise<VehicleData[]> => {
  const config = cancelToken ? { cancelToken } : {};
  const response = await axios.post(
    `${API_URL}/sales`,
    { startDate, endDate },
    config,
  );
  return response.data;
};

export const getMonthlyVehicleSalesService = async (
  monthsOfInterval: Date[],
  startDate: Date,
  endDate: Date,
  cancelToken?: CancelToken,
): Promise<VehicleData[][]> => {
  const config = cancelToken ? { cancelToken } : {};

  const responses = await Promise.all(
    monthsOfInterval.map((month, index) => {
      const startOfMonth = index === 0 ? new Date(startDate) : month;
      const endOfMonthDate =
        index === monthsOfInterval.length - 1
          ? new Date(endDate)
          : endOfMonth(new Date(month));
      return axios.post(
        '/api/vehicle/sales',
        {
          startDate: startOfMonth,
          endDate: endOfMonthDate,
        },
        config,
      );
    }),
  );
  return responses.map((response) => response.data);
};

export const searchVehiclesService = async (
  params: VehicleSearchParams,
  cancelToken: CancelToken,
) => {
  try {
    const response = await axios.post(`${API_URL}/search`, params, {
      cancelToken: cancelToken,
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Vehicle search cancelled');
      return;
    }
    console.error(`Error searching vehicles: ${error}`);
  }
};
