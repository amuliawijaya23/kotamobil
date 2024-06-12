import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import { getInventory } from '~/redux/reducers/inventorySlice';
import {
  setVehicleData,
  resetVehicleData,
} from '~/redux/reducers/vehicleSlice';
import { useParams } from 'react-router-dom';

const useVehicleData = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(getInventory);

  const findAndSetVehicleData = useCallback(async () => {
    try {
      const vehicle = inventory?.find((v) => v._id === id);

      if (vehicle) {
        dispatch(setVehicleData(vehicle));
      }
    } catch (error) {
      console.error('Error getting vehicle data:', error);
    }
  }, [dispatch, inventory, id]);

  useEffect(() => {
    if (id) {
      findAndSetVehicleData();
    }
    return () => {
      dispatch(resetVehicleData());
    };
  }, [id, dispatch, findAndSetVehicleData]);
};

export default useVehicleData;
