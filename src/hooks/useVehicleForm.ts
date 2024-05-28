import axios, { AxiosError } from 'axios';

import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import {
  addVehicleToInventory,
  updateVehicleFromInventory,
} from '~/redux/reducers/inventorySlice';
import {
  getVehicleFormData,
  resetVehicleForm,
  setAlert,
  setName,
  setStatus,
  setDateAdded,
  setDateSold,
  setPrice,
  setMarketPrice,
  setPurchasePrice,
  setSoldPrice,
  setCondition,
  setPlateNumber,
  setTaxDate,
  setVin,
  setMake,
  setModel,
  setAssembly,
  setYear,
  setOdometer,
  setColor,
  setTransmission,
  setFuelType,
  setDescription,
  setSpecification,
} from '~/redux/reducers/formSlice';

const useVehicleForm = () => {
  const dispatch = useAppDispatch();

  const vehicle = useAppSelector(getVehicleData);
  const vehicleFormData = useAppSelector(getVehicleFormData);

  const initializeForm = useCallback(() => {
    if (vehicle) {
      dispatch(setName(vehicle.name));
      dispatch(setStatus(vehicle.sold ? 'Sold' : 'Available'));
      dispatch(setDateAdded(vehicle.dateAdded));
      dispatch(setPrice(vehicle.price));
      dispatch(setVin(vehicle.vin));
      dispatch(setMake(vehicle.make));
      dispatch(setModel(vehicle.model));
      dispatch(setAssembly(vehicle.assembly));
      dispatch(setYear(vehicle.year));
      dispatch(setOdometer(vehicle.odometer));
      dispatch(setColor(vehicle.color));
      dispatch(setTransmission(vehicle.transmission));
      dispatch(setFuelType(vehicle.fuelType));
      vehicle.marketPrice && dispatch(setMarketPrice(vehicle.marketPrice));
      vehicle.purchasePrice &&
        dispatch(setPurchasePrice(vehicle.purchasePrice));
      vehicle.description && dispatch(setDescription(vehicle.description));
      vehicle.specification &&
        vehicle.specification.length > 0 &&
        dispatch(setSpecification(vehicle.specification));
      dispatch(setCondition(vehicle.condition));
      if (vehicle.condition === 'Used') {
        vehicle.plateNumber && dispatch(setPlateNumber(vehicle.plateNumber));
        vehicle.taxDate && dispatch(setTaxDate(vehicle.taxDate));
      }
      if (vehicle.sold) {
        vehicle.dateSold && dispatch(setDateSold(vehicle.dateSold));
        vehicle.soldPrice && dispatch(setSoldPrice(vehicle.soldPrice));
      }
    }

    return () => {
      dispatch(resetVehicleForm());
    };
  }, [vehicle, dispatch]);

  useEffect(initializeForm, [initializeForm]);

  const clearVehicleForm = () => {
    if (vehicle) {
      initializeForm();
    } else {
      dispatch(resetVehicleForm());
    }
  };

  const handleOnSave = async () => {
    try {
      let success = false;

      const formData = new FormData();
      const data: Record<string, unknown> = {};

      data.name = vehicleFormData.name;
      data.vin = vehicleFormData.vin;
      data.make = vehicleFormData.make;
      data.model = vehicleFormData.model;
      data.year = vehicleFormData.year;
      data.odometer = vehicleFormData.odometer;
      data.price = vehicleFormData.price;
      data.color = vehicleFormData.color;
      data.condition = vehicleFormData.condition;
      data.assembly = vehicleFormData.assembly;
      data.transmission = vehicleFormData.transmission;
      data.fuelType = vehicleFormData.fuelType;
      data.sold = vehicleFormData.status === 'Sold' ? true : false;
      data.dateAdded = vehicleFormData.dateAdded;

      vehicleFormData.description &&
        (data.description = vehicleFormData.description);
      vehicleFormData.marketPrice &&
        (data.marketPrice = vehicleFormData.marketPrice);
      vehicleFormData.purchasePrice &&
        (data.purchasePrice = vehicleFormData.purchasePrice);

      const specifications = vehicleFormData.specification.filter((s) => s);
      specifications.length > 0 && (data.specification = specifications);

      vehicleFormData.status === 'Sold' &&
        (data.dateSold = vehicleFormData.dateSold) &&
        (data.soldPrice = vehicleFormData.soldPrice);

      vehicleFormData.condition === 'Used' &&
        (data.plateNumber = vehicleFormData.plateNumber) &&
        (data.taxDate = vehicleFormData.taxDate);

      formData.set('data', JSON.stringify(data));

      if (vehicleFormData.images) {
        for (const [index, image] of vehicleFormData.images.entries()) {
          index === 0
            ? formData.set('images', image)
            : formData.append('images', image);
        }
      }

      const response = vehicle
        ? await axios.post(`/api/vehicle/update/${vehicle._id}`, formData)
        : await axios.post('/api/vehicle/add', formData);

      vehicle
        ? dispatch(updateVehicleFromInventory(response.data))
        : dispatch(addVehicleToInventory(response.data));

      success = true;
      clearVehicleForm();
      return success;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return dispatch(
          setAlert({
            message: error?.response?.data?.message,
            severity: 'error',
          }),
        );
      }
    }
  };

  return {
    handleOnSave,
    clearVehicleForm,
  };
};

export default useVehicleForm;
