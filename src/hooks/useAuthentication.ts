import Cookies from 'js-cookie';
import { useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { setAuthenticated, setLoading } from '~/redux/reducers/appSlice';
import { login, logout } from '~/redux/reducers/userSlice';
import { resetContacts } from '~/redux/reducers/contactsSlice';
import { resetInventory } from '~/redux/reducers/inventorySlice';
import {
  getUserFormData,
  setAlert,
  resetUserForm,
  resetAlert,
} from '~/redux/reducers/formSlice';
const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;
const LC_USER_DATA = 'LC_USER_DATA';

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const userFormData = useAppSelector(getUserFormData);

  const handleLogout = useCallback(async () => {
    try {
      dispatch(logout());
      dispatch(setAuthenticated(false));
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      dispatch(resetInventory());
      dispatch(resetContacts());
    }
  }, [dispatch]);

  const getUserData = useCallback(async () => {
    dispatch(setLoading(true));
    const userData = localStorage.getItem(LC_USER_DATA);
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login(parsedUserData));
        dispatch(setAuthenticated(true));
      } catch (error) {
        console.error('Failed to get user data:', error);
      } finally {
        dispatch(setLoading(false));
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

  const handleRegister = async () => {
    dispatch(setLoading(true));
    const { firstName, lastName, email, password, confirmPassword } =
      userFormData;
    try {
      if (!firstName || !email || !password || !confirmPassword) {
        dispatch(
          setAlert({ message: 'Missing parameters', severity: 'error' }),
        );
        return;
      }

      if (!userFormData.isValidEmail) {
        dispatch(
          setAlert({ message: 'Invalid email address', severity: 'error' }),
        );
        return;
      }

      if (password !== confirmPassword) {
        dispatch(
          setAlert({ message: 'Passwords do not match', severity: 'error' }),
        );
        return;
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
        dispatch(
          setAlert({ message: response.data.message, severity: 'error' }),
        );
        return;
      }

      dispatch(login(response.data));
      return true;
    } catch (error) {
      console.error('Error occured while registering user:', error);
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
        return;
      }
    } finally {
      dispatch(resetUserForm());
      dispatch(resetAlert());
      dispatch(setLoading(false));
    }
    return false;
  };

  const handleLogin = async () => {
    dispatch(setLoading(true));
    try {
      const { email, password } = userFormData;
      if (!email || !password) {
        dispatch(
          setAlert({ message: 'Missing parameters', severity: 'error' }),
        );
        return;
      }

      if (!userFormData.isValidEmail) {
        dispatch(
          setAlert({ message: 'Invalid email address', severity: 'error' }),
        );
        return;
      }

      const response = await axios.post('/api/auth/login', { email, password });

      if (response.status !== 200) {
        dispatch(
          setAlert({ message: response.data.message, severity: 'error' }),
        );
        return;
      }

      const userData = { ...response.data.user };
      delete userData.password;

      dispatch(login(userData));
      return true;
    } catch (error) {
      console.error('Error occured while logging in:', error);
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            message: error.response?.data.message,
            severity: 'error',
          }),
        );
      }
    } finally {
      dispatch(resetUserForm());
      dispatch(resetAlert());
      dispatch(setLoading(false));
    }
    return false;
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default useAuthentication;
