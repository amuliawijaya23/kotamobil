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
  resetContactForm,
} from '~/redux/reducers/formSlice';
import { addContact } from '~/redux/reducers/contactsSlice';
import { validateEmail } from '~/helpers';

const initialCountry = {
  label: 'Indonesia',
  code: 'ID',
  phone: '62',
};

const useContactForm = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [country, setCountry] = useState<CountryType | null>(initialCountry);

  const dispatch = useAppDispatch();

  const contactFormData = useAppSelector(getContactFormData);

  const handleResetForm = () => {
    dispatch(resetContactForm());
    setIsValidEmail(false);
    setCountry(initialCountry);
  };

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
      let success = false;
      const formData = { ...contactFormData };

      if (!formData.firstName || formData.mobile.length > 10) {
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
        dispatch(addContact(response.data));
        success = true;
        return success;
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
    handleResetForm,
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
