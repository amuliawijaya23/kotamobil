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

  const findAndSetVehicleData = useCallback(() => {
    const vehicle = inventory?.filter((v) => v._id === id);

    if (vehicle) {
      dispatch(setVehicleData(vehicle[0]));
    }
  }, [dispatch, id, inventory]);

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
