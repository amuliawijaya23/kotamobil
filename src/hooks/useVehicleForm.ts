import type { ContactData } from '~/redux/reducers/contactsSlice';
import axios, { AxiosError } from 'axios';

import { useState, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { getContactsData } from '~/redux/reducers/contactsSlice';
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
  const contacts = useAppSelector(getContactsData);
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const [images, setImages] = useState<File[] | null | undefined>(null);
  const [vehicleImages, setVehicleImages] = useState<
    { key: string; url: string }[] | null
  >(vehicle?.images || null);
  const [removedImages, setRemovedImages] = useState<
    { key: string; url: string }[] | null
  >(null);
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initializeForm = useCallback(() => {
    if (vehicle) {
      dispatch(setName(vehicle.name));
      dispatch(setStatus(vehicle.sold ? 'Sold' : 'Available'));
      dispatch(setDateAdded(JSON.stringify(vehicle.dateAdded)));
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
      vehicle.specification && vehicle.specification.length > 0
        ? dispatch(setSpecification(vehicle.specification))
        : dispatch(setSpecification(['']));
      dispatch(setCondition(vehicle.condition));
      vehicle.images && setVehicleImages(vehicle.images);
      if (vehicle.condition === 'Used') {
        vehicle.plateNumber && dispatch(setPlateNumber(vehicle.plateNumber));
        vehicle.taxDate &&
          dispatch(setTaxDate(JSON.stringify(vehicle.taxDate)));
      }
      if (vehicle.sold) {
        vehicle.dateSold &&
          dispatch(setDateSold(JSON.stringify(vehicle.dateSold)));
        vehicle.soldPrice && dispatch(setSoldPrice(vehicle.soldPrice));
        vehicle.buyerId &&
          setContact(contacts?.find((c) => c._id === vehicle.buyerId) || null);
      }
    }

    return () => {
      dispatch(resetVehicleForm());
      setImages(null);
      setVehicleImages(null);
      setRemovedImages(null);
    };
  }, [vehicle, contacts, dispatch]);

  useEffect(initializeForm, [initializeForm]);

  const onDrop = useCallback(
    (acceptedFiles: File[] | undefined) => {
      if (acceptedFiles) {
        let currentImagesLength = 0;

        vehicle?.images && (currentImagesLength += vehicle?.images?.length);

        if (images) {
          currentImagesLength += images.length;

          if (currentImagesLength + acceptedFiles.length > 10) {
            return dispatch(
              setAlert({
                message:
                  'You have exceeded the maximum number of allowed images',
                severity: 'error',
              }),
            );
          }
          const currentImages = images.concat(acceptedFiles);
          return setImages(currentImages);
        }

        if (currentImagesLength + acceptedFiles.length > 10) {
          return dispatch(
            setAlert({
              message: 'You have exceeded the maximum number of allowed images',
              severity: 'error',
            }),
          );
        }

        return setImages(acceptedFiles);
      }
    },
    [vehicle, images, dispatch],
  );

  const handleRemoveVehicleImages = (index: number) => {
    if (vehicleImages) {
      const newVehicleImages = [...vehicleImages];
      const newRemovedImages = removedImages ? [...removedImages] : [];
      newRemovedImages.push(vehicleImages[index]);
      setRemovedImages(newRemovedImages);
      newVehicleImages.splice(index, 1);
      setVehicleImages(newVehicleImages);
    }
  };

  const handleRemoveUploadedImages = (index: number) => {
    if (images) {
      const newImages = [...images];
      newImages.splice(index, 1);
      setImages(newImages);
    }
  };

  const handleBuyerChange = (_event: unknown, input: ContactData | null) => {
    setContact(input);
  };

  const clearVehicleForm = () => {
    if (vehicle) {
      initializeForm();
    } else {
      dispatch(resetVehicleForm());
    }
    setImages(null);
    setRemovedImages(null);
  };

  const handleOnSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const data: Record<string, unknown> = {
        name: vehicleFormData.name,
        vin: vehicleFormData.vin,
        make: vehicleFormData.make,
        model: vehicleFormData.model,
        year: vehicleFormData.year,
        odometer: vehicleFormData.odometer,
        price: vehicleFormData.price,
        color: vehicleFormData.color,
        condition: vehicleFormData.condition,
        assembly: vehicleFormData.assembly,
        transmission: vehicleFormData.transmission,
        fuelType: vehicleFormData.fuelType,
        sold: vehicleFormData.status === 'Sold',
        dateAdded: JSON.parse(vehicleFormData.dateAdded),
        description: vehicleFormData.description,
        marketPrice: vehicleFormData.marketPrice,
        purchasePrice: vehicleFormData.purchasePrice,
        specification: vehicleFormData.specification.filter((s) => s),
      };

      vehicleFormData.status === 'Sold' &&
        (data.dateSold = JSON.parse(vehicleFormData.dateSold)) &&
        (data.soldPrice = vehicleFormData.soldPrice) &&
        (data.buyerId = contact?._id);

      vehicleFormData.condition === 'Used' &&
        (data.plateNumber = vehicleFormData.plateNumber) &&
        (data.taxDate = JSON.parse(vehicleFormData.taxDate));

      removedImages && (data.images = removedImages);

      formData.set('data', JSON.stringify(data));

      if (images) {
        for (const [index, image] of images.entries()) {
          index === 0
            ? formData.set('images', image)
            : formData.append('images', image);
        }
      }

      const response = vehicle
        ? await axios.post(`/api/vehicle/update/${vehicle._id}`, formData)
        : await axios.post('/api/vehicle/add', formData);

      if (response.status === 200 && response.data) {
        const action = vehicle
          ? updateVehicleFromInventory
          : addVehicleToInventory;
        vehicle
          ? dispatch(action(response.data))
          : dispatch(action(response.data));

        clearVehicleForm();
        dispatch(
          setAlert({
            message: vehicle ? 'Vehicle Updated!' : 'Vehicle Created!',
            severity: 'success',
          }),
        );
        return true;
      }
    } catch (error) {
      console.error('Error saving vehicle data:', error);
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            message: error?.response?.data?.message,
            severity: 'error',
          }),
        );
      }
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    loading,
    images,
    vehicleImages,
    contact,
    onDrop,
    handleRemoveVehicleImages,
    handleRemoveUploadedImages,
    handleBuyerChange,
    handleOnSave,
    clearVehicleForm,
  };
};

export default useVehicleForm;
