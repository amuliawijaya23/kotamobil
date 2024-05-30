import { useCallback, useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector } from '~/redux/store';

import { getSession } from '~/redux/reducers/userSlice';

import {
  setInventoryData,
  setQueryData,
  resetInventory,
} from '~/redux/reducers/inventorySlice';

const useInventoryData = () => {
  const dispatch = useAppDispatch();

  const session = useAppSelector(getSession);

  const getUserInventory = useCallback(async () => {
    try {
      if (session.isAuthenticated) {
        const response = await axios.get('/api/vehicle');

        if (response.status === 200 && response.data.length > 0) {
          dispatch(setInventoryData(response.data));
          dispatch(setQueryData(response.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, session.isAuthenticated]);

  useEffect(() => {
    getUserInventory();

    return () => {
      dispatch(resetInventory());
    };
  }, [dispatch, getUserInventory]);
};

export default useInventoryData;
