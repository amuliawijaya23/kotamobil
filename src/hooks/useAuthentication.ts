import Cookies from 'js-cookie';
import { useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { setAuthenticated } from '~/redux/reducers/appSlice';
import { login, logout } from '~/redux/reducers/userSlice';
import { resetContacts } from '~/redux/reducers/contactsSlice';
import { resetInventory } from '~/redux/reducers/inventorySlice';
import {
  setError,
  resetAuthForm,
  getAuthFormData,
  resetError,
} from '~/redux/reducers/authFormSlice';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;
const LC_USER_DATA = 'LC_USER_DATA';

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const authFormData = useAppSelector(getAuthFormData);

  const handleLogout = useCallback(async () => {
    try {
      const response = await axios.delete('/api/auth/logout');
      if (response.status === 200) {
        dispatch(setAuthenticated(false));
        dispatch(logout());
        dispatch(resetInventory());
        dispatch(resetContacts());
        return true;
      }
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
    return false;
  }, [dispatch]);

  const getUserData = useCallback(async () => {
    const userData = localStorage.getItem(LC_USER_DATA);
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login(parsedUserData));
        dispatch(setAuthenticated(true));
      } catch (error) {
        console.error('Failed to get user data:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      getUserData();
    } else {
      dispatch(setAuthenticated(false));
      dispatch(logout());
    }
  }, [dispatch, getUserData, handleLogout]);

  const handleRegister = async () => {
    const { firstName, lastName, email, password, confirmPassword } =
      authFormData;
    try {
      if (!firstName || !email || !password || !confirmPassword) {
        dispatch(setError('Missing parameters'));
        return false;
      }

      if (!authFormData.isValidEmail) {
        dispatch(setError('Invalid email address'));
        return false;
      }

      if (password !== confirmPassword) {
        dispatch(setError('Passwords do not match'));
        return false;
      }

      await axios.post('/api/auth/register', {
        firstName: `${firstName[0].toUpperCase()}${firstName
          .substring(1)
          .toLowerCase()}`,
        lastName: lastName
          ? `${lastName[0].toUpperCase()}${lastName.substring(1).toLowerCase()}`
          : '',
        email,
        password,
      });

      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      const userData = { ...response.data };
      delete userData.password;
      dispatch(login(userData));
      dispatch(setAuthenticated(true));
      dispatch(resetAuthForm());
      dispatch(resetError());
      return true;
    } catch (error) {
      console.error('Error occured while registering user:', error);
      if (error instanceof AxiosError) {
        dispatch(setError(error.response?.data.message));
      }
    }
    return false;
  };

  const handleLogin = async () => {
    try {
      const { email, password } = authFormData;
      if (!email || !password) {
        dispatch(setError('Missing parameters'));
        return false;
      }

      if (!authFormData.isValidEmail) {
        dispatch(setError('Invalid email address'));
        return false;
      }

      const response = await axios.post('/api/auth/login', { email, password });

      const userData = { ...response.data };
      delete userData.password;
      dispatch(login(userData));
      dispatch(setAuthenticated(true));
      dispatch(resetAuthForm());
      dispatch(resetError());
      return true;
    } catch (error) {
      console.error('Error occured while logging in:', error);
      if (error instanceof AxiosError) {
        dispatch(setError(error.response?.data.message));
      }
    }
    return false;
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuthentication;
