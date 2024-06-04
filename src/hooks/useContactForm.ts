import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getContactFormData,
  resetContactForm,
  setFirstName,
  setLastName,
  setCountry,
  setMobile,
  setEmail,
  setAddress,
  setInstagram,
  setFacebook,
  setTwitter,
  setLinkedIn,
} from '~/redux/reducers/contactFormSlice';
import { setAlert } from '~/redux/reducers/appSlice';
import { addContact, updateContact } from '~/redux/reducers/contactsSlice';
import type { CountryType } from '~/helpers/selectData';

const useContactForm = () => {
  const dispatch = useAppDispatch();
  const contactFormData = useAppSelector(getContactFormData);
  // const [country, setCountry] = useState<CountryType | null>(null);

  const handleResetForm = useCallback(() => {
    dispatch(resetContactForm());
  }, [dispatch]);

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
  };

  const handleCountryChange = (_event: unknown, values: CountryType | null) => {
    dispatch(setCountry(values));
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

  const handleLinkedInChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setLinkedIn(event.target.value));
  };

  const validateForm = (): string | null => {
    if (!contactFormData.firstName || contactFormData.mobile.length < 10) {
      return 'Missing required parameter';
    }

    if (contactFormData.email && !contactFormData.isValidEmail) {
      return 'Invalid email address';
    }
    return null;
  };

  const handleOnSave = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updateId, country, isValidEmail, ...data } = contactFormData;
      const formData = { ...data };

      const validationError = validateForm();
      if (validationError) {
        dispatch(setAlert({ message: validationError, severity: 'error' }));
        return false;
      }

      const response = updateId
        ? await axios.post(`/api/contact/update/${updateId}`, formData)
        : await axios.post('/api/contact/add', formData);

      if (response.status == 200 && response.data) {
        const action = updateId ? updateContact : addContact;
        dispatch(action(response.data));
        const message = updateId ? 'Contact updated!' : 'New contact created!';
        dispatch(setAlert({ message: message, severity: 'success' }));
        handleResetForm();
        return true;
      }

      dispatch(
        setAlert({
          message: 'Failed to save contact, please try again',
          severity: 'error',
        }),
      );
      return false;
    } catch (error) {
      console.error('Error occured while saving contact:', error);
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    }
    return false;
  };

  return {
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
    handleLinkedInChange,
    handleOnSave,
  };
};

export default useContactForm;
