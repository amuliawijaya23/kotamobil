import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { getSession, login, logout } from '~/redux/reducers/userSlice';
import { resetContacts, setContactsData } from '~/redux/reducers/contactsSlice';
import {
  setInventoryData,
  setQueryData,
  resetInventory,
} from '~/redux/reducers/inventorySlice';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;
const LC_USER_DATA = 'LC_USER_DATA';

const useApplicationData = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(getSession);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = useCallback(async () => {
    try {
      await axios.delete('/api/auth/logout');
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      dispatch(logout());
      dispatch(resetInventory());
      dispatch(resetContacts());
    }
  }, [dispatch]);

  const getUserData = useCallback(async () => {
    const userData = localStorage.getItem(LC_USER_DATA);
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        dispatch(login(parsedUserData));
      } catch (error) {
        console.error('Failed to get user data:', error);
        dispatch(logout());
      }
    }
  }, [dispatch]);

  const getUserVehiclesAndContacts = useCallback(async () => {
    setLoading(true);
    try {
      const [vehicles, contacts] = await Promise.all([
        axios.get('/api/vehicle'),
        axios.get('/api/contact'),
      ]);

      if (vehicles.status === 200 && vehicles.data.length > 0) {
        dispatch(setInventoryData(vehicles.data));
        dispatch(setQueryData(vehicles.data));
      }

      if (contacts.status === 200 && contacts.data.length > 0) {
        dispatch(setContactsData(contacts.data));
      }
    } catch (error) {
      console.error('Failed to fetch vehicles and contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      getUserData();
    } else {
      handleLogout();
    }
  }, [dispatch, getUserData, handleLogout]);

  useEffect(() => {
    if (session.isAuthenticated) {
      getUserVehiclesAndContacts();
    } else {
      dispatch(resetInventory());
      dispatch(resetContacts());
    }
  }, [session.isAuthenticated, dispatch, getUserVehiclesAndContacts]);

  return { loading };
};

export default useApplicationData;
