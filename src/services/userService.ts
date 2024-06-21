import type { UserData } from '~/redux/reducers/userSlice';
import axios, { AxiosResponse } from 'axios';

const API_URL = '/api/auth';

export const loginService = async (
  email: string,
  password: string,
): Promise<UserData> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const registerService = async (
  userData: Partial<UserData>,
): Promise<UserData> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const verifyService = async (id: string): Promise<UserData> => {
  const response = await axios.get(`${API_URL}/verify/${id}`);
  return response.data;
};

export const checkSessionService = async (): Promise<UserData> => {
  const response = await axios.get(`${API_URL}/verify-session`);
  return response.data;
};

export const resendVerificationLinkService = async (
  userId: string,
): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/send-verification`, { userId });
  return response;
};

export const logoutService = async (): Promise<void> => {
  await axios.delete(`${API_URL}/logout`);
};
