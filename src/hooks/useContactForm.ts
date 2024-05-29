import axios, { AxiosError } from 'axios';
import type { CountryType } from '~/helpers/selectData';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getContactFormData,
  setAlert,
  setFirstName,
  setLastName,
  setMobile,
  setEmail,
  setAddress,
  setInstagram,
  setFacebook,
  setTwitter,
  setTiktok,
} from '~/redux/reducers/formSlice';
import { addContact } from '~/redux/reducers/contactsSlice';
import { validateEmail } from '~/helpers';

const useContactForm = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [country, setCountry] = useState<CountryType | null>({
    label: 'Indonesia',
    code: 'ID',
    phone: '62',
  });

  const dispatch = useAppDispatch();

  const contactFormData = useAppSelector(getContactFormData);

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setFirstName(event.target.value));
  };

  const handleLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setLastName(event.target.value));
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setEmail(event.target.value));
    setIsValidEmail(validateEmail(event.target.value));
  };

  const handleCountryChange = (event: unknown, values: CountryType | null) => {
    setCountry(values);
    if (values?.phone) {
      dispatch(setMobile(`${'+'}${values.phone}`));
    }
  };

  const handleMobileChange = (input: string) => {
    dispatch(setMobile(input));
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setAddress(event.target.value));
  };

  const handleInstagramChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setInstagram(event.target.value));
  };

  const handleFacebookchange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setFacebook(event.target.value));
  };

  const handleTwitterChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setTwitter(event.target.value));
  };

  const handleTiktokChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setTiktok(event.target.value));
  };

  const handleOnSave = async () => {
    try {
      const formData = { ...contactFormData };

      if (!formData.firstName || !formData.mobile) {
        return dispatch(
          setAlert({
            message: 'Missing required parameters',
            severity: 'error',
          }),
        );
      }

      if (formData.email && !isValidEmail) {
        return dispatch(
          setAlert({ message: 'Invalid email address', severity: 'error' }),
        );
      }

      const response = await axios.post('/api/contact/add', formData);

      if (response.status == 200 && response.data) {
        return dispatch(addContact(response.data));
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    }
  };

  return {
    isValidEmail,
    country,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleCountryChange,
    handleMobileChange,
    handleAddressChange,
    handleInstagramChange,
    handleFacebookchange,
    handleTwitterChange,
    handleTiktokChange,
    handleOnSave,
  };
};

export default useContactForm;
