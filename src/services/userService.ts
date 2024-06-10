import type { UserData } from '~/redux/reducers/userSlice';
import axios from 'axios';

const API_URL = '/api/auth';

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerService = async (userData: Partial<UserData>) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const logoutService = async () => {
  await axios.delete(`${API_URL}/logout`);
};