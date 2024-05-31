import axios from 'axios';
import { useEffect, useCallback, useMemo } from 'react';
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

const useVehicleData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(getInventory);

  const vehicle = useMemo(() => {
    return inventory ? inventory.find((v) => v._id === id) : null;
  }, [id, inventory]);

  const findAndSetVehicleData = useCallback(async () => {
    if (vehicle) {
      const vehicleData = { ...vehicle };
      try {
        if (vehicle.images) {
          const { data } = await axios.get(`/api/vehicle/images/${id}`);
          if (data) {
            vehicleData.images = data;
          }
        }
        dispatch(setVehicleData(vehicleData));
      } catch (error) {
        console.error('Error fetching vehicle images:', error);
      }
    }
  }, [dispatch, id, vehicle]);

  useEffect(() => {
    if (id) {
      findAndSetVehicleData();
    }
    return () => {
      dispatch(resetVehicleData());
    };
  }, [id, dispatch, findAndSetVehicleData]);

  const handleOnDelete = async () => {
    if (!vehicle || !inventory || !Array.isArray(inventory)) return;
    try {
      const response = await axios.delete(`/api/vehicle/delete/${id}`);

      if (response.status === 200) {
        const updatedInventory = inventory.filter((item) => item._id !== id);
        dispatch(setInventoryData(updatedInventory));
        navigate('/inventory');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { handleOnDelete };
};

export default useVehicleData;
