import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/store';
import {
  getInventory,
  setInventoryData,
} from '~/redux/reducers/inventorySlice';
import {
  setVehicleData,
  resetVehicleData,
} from '~/redux/reducers/vehicleSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { setAlert } from '~/redux/reducers/appSlice';

const useVehicleData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleOnDelete = async () => {
    if (!inventory || !Array.isArray(inventory)) return;
    try {
      const response = await axios.delete(`/api/vehicle/delete/${id}`);

      if (response.status === 204) {
        const updatedInventory = inventory.filter((item) => item._id !== id);
        dispatch(setInventoryData(updatedInventory));
        dispatch(
          setAlert({ message: response.data.message, severity: 'success' }),
        );
        navigate('/inventory');
      }
    } catch (error) {
      console.error('Error occured while deleting vehicle:', error);
    }
  };

  return { handleOnDelete };
};

export default useVehicleData;
