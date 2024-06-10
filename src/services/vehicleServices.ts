import axios from 'axios';

const API_URL = '/api/vehicle';

export const addVehicleService = async (formData: FormData) => {
  const response = await axios.post(`${API_URL}/add`, formData);
  return response.data;
};

export const updateVehicleService = async (id: string, formData: FormData) => {
  const response = await axios.post(`${API_URL}/update/${id}`, formData);
  return response.data;
};

export const deleteVehicleService = async (id: string) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
};
