import { useCallback, useEffect } from 'react';
import axios from 'axios';

import { useAppDispatch } from '~/redux/store';
import {
  setInventoryData,
  setQueryData,
} from '~/redux/reducers/inventorySlice';

const useInventoryData = () => {
  const dispatch = useAppDispatch();

  const getUserInventory = useCallback(async () => {
    try {
      const response = await axios.get('/api/vehicle');

      if (response.status === 200 && response.data.length > 0) {
        dispatch(setInventoryData(response.data));
        dispatch(setQueryData(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getUserInventory();
  }, [getUserInventory]);
};

export default useInventoryData;
