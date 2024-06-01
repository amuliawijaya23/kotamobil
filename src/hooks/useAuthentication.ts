import Cookies from 'js-cookie';
import React, { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '~/redux/store';
import { login, logout } from '~/redux/reducers/userSlice';
import { resetContacts } from '~/redux/reducers/contactsSlice';
import { resetInventory } from '~/redux/reducers/inventorySlice';
import { validateEmail } from '~/helpers';
const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;
const LC_USER_DATA = 'LC_USER_DATA';

const useAuthentication = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      dispatch(resetInventory());
      dispatch(resetContacts());
    }
  }, [dispatch]);

  const getUserData = useCallback(async () => {
    setLoading(true);
    const userData = localStorage.getItem(LC_USER_DATA);
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login(parsedUserData));
      } catch (error) {
        console.error('Failed to get user data:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      getUserData();
    } else {
      handleLogout();
    }
  }, [dispatch, getUserData, handleLogout]);

  const handleClearError = () => {
    setError('');
  };

  const handleResetAuthenticationForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setIsValidEmail(false);
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleOnChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleOnChangeLastName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLastName(event.target.value);
  };

  const handleOnChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleOnChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      if (!firstName || !email || !password || !confirmPassword) {
        return setError('Missing parameter');
      }

      if (!isValidEmail) {
        return setError('Invalid email address');
      }

      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }

      const response = await axios.post('/api/auth/register', {
        firstName: `${firstName[0].toUpperCase()}${
          firstName.substring(1).toLowerCase
        }`,
        lastName: lastName
          ? `${lastName[0].toUpperCase()}${lastName.substring(1).toLowerCase()}`
          : '',
        email,
        password,
      });

      if (response.status !== 200) {
        return setError(response.data.message);
      }

      dispatch(login(response.data));
      return true;
    } catch (error) {
      console.error('Error occured while registering user:', error);
      if (error instanceof AxiosError) {
        return setError(error?.response?.data?.message);
      }
    } finally {
      handleResetAuthenticationForm();
      setLoading(false);
    }
    return false;
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        return setError('Missing parameter');
      }

      if (!isValidEmail) {
        return setError('Invalid email address');
      }

      const response = await axios.post('/api/auth/login', { email, password });

      if (response.status !== 200) {
        setError(response.data.message);
        return;
      }

      const userData = { ...response.data.user };
      delete userData.password;

      dispatch(login(userData));
      return true;
    } catch (error) {
      console.error('Error occured while logging in:', error);
      if (error instanceof AxiosError) {
        setError(error?.response?.data?.message);
      }
    } finally {
      handleResetAuthenticationForm();
      setLoading(false);
    }
    return false;
  };

  return {
    loading,
    firstName,
    lastName,
    email,
    isValidEmail,
    password,
    confirmPassword,
    error,
    handleClearError,
    handleOnChangeFirstName,
    handleOnChangeLastName,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOnChangeConfirmPassword,
    handleLogin,
    handleRegister,
  };
};

export default useAuthentication;
