import type { ContactData } from '~/redux/reducers/contactsSlice';
import axios, { CancelToken } from 'axios';

const API_URL = '/api/contact';

export const addContactService = async (
  formData: Partial<ContactData>,
): Promise<ContactData> => {
  const response = await axios.post(`${API_URL}/add`, formData);
  return response.data;
};

export const updateContactService = async (
  id: string,
  formData: Partial<ContactData>,
): Promise<ContactData> => {
  const response = await axios.post(`${API_URL}/update/${id}`, formData);
  return response.data;
};

export const deleteContactsservice = async (
  contactIds: string[],
): Promise<void> => {
  await axios.post(`${API_URL}/delete`, { contactIds });
};

export const getContactsService = async (): Promise<ContactData[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const searchContactsService = async (
  search: string,
  cancelToken: CancelToken,
): Promise<ContactData[]> => {
  const response = await axios.post(
    `${API_URL}/search`,
    { search },
    { cancelToken: cancelToken },
  );
  return response.data;
};
