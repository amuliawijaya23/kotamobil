import axios, { AxiosError } from 'axios';

import { useState, useCallback } from 'react';

import { SelectChangeEvent } from '@mui/material';

import { useAppDispatch } from '~/redux/store';
import { AddVehicleToInventory } from '~/redux/reducers/inventorySlice';

const useVehicleForm = () => {
  const dispatch = useAppDispatch();
  // Form error state
  const [error, setError] = useState('');

  // VehicleImages State
  const [images, setImages] = useState<File[] | undefined | null>(null);

  // VehicleStatus State
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<string>('Available');
  const [dateAdded, setDateAdded] = useState<Date | null>(new Date(Date.now()));
  const [dateSold, setDateSold] = useState<Date | null>(null);
  const [price, setPrice] = useState<string | number | null | undefined>(null);
  const [marketPrice, setMarketPrice] = useState<
    string | number | null | undefined
  >(null);
  const [purchasePrice, setPurchasePrice] = useState<
    string | number | null | undefined
  >(null);
  const [soldPrice, setSoldPrice] = useState<
    string | number | null | undefined
  >(null);
  const [condition, setCondition] = useState<string>('New');
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [taxDate, setTaxDate] = useState<Date | null>(null);

  // VehicleDetails State
  const [vin, setVin] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [assembly, setAssembly] = useState<string>('');
  const [year, setYear] = useState<number | boolean>(false);
  const [odometer, setOdometer] = useState<number | boolean>(false);
  const [color, setColor] = useState<string>('');
  const [transmission, setTransmission] = useState<string>('Automatic');
  const [fuelType, setFuelType] = useState<string>('Petrol');
  const [description, setDescription] = useState<string>('');

  // VehicleSpecifications State
  const [specification, setSpecification] = useState<string[]>(['']);

  // Change Handlers for VehicleImages

  const onDrop = useCallback(
    (acceptedFiles: File[] | undefined) => {
      if (acceptedFiles) {
        if (images) {
          const currentImages = images?.concat(acceptedFiles);
          return setImages(currentImages);
        }
        return setImages(acceptedFiles);
      }
    },
    [images],
  );

  // ChangeEvent Handlers for VehicleStatus

  const handleVehicleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleDateAddedChange = (input: Date | null) => {
    setDateAdded(input);
  };

  const handleDateSoldChange = (input: Date | null) => {
    setDateSold(input);
  };

  const handlePriceChange = (value: number | null | undefined) => {
    setPrice(value);
  };

  const handleMarketPriceChange = (value: number | null | undefined) => {
    setMarketPrice(value);
  };

  const handlePurchasePriceChange = (value: number | null | undefined) => {
    setPurchasePrice(value);
  };

  const handleSoldPriceChange = (value: number | null | undefined) => {
    setSoldPrice(value);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };

  const handlePlateNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPlateNumber(event.target.value);
  };

  const handleTaxDateChange = (input: Date | null) => {
    setTaxDate(input);
  };

  // ChangeEvent handlers for VehicleDetails

  const handleVinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setVin(event.target.value);
  };

  const handleMakeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMake(event.target.value);
  };

  const handleModelChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setModel(event.target.value);
  };

  const handleAssemblyChange = (event: SelectChangeEvent) => {
    setAssembly(event.target.value as string);
  };

  const handleYearChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setYear(Number(event.target.value));
  };

  const handleOdometerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setOdometer(Number(event.target.value));
  };

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setColor(event.target.value);
  };

  const handleTransmissionChange = (event: SelectChangeEvent) => {
    setTransmission(event.target.value as string);
  };

  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    setFuelType(event.target.value as string);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDescription(event.target.value);
  };

  // ChangeEvent handlers for VehicleSpecifications
  const handleSpecificationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const newSpecification = [...specification];
    newSpecification[index] = event.target.value;
    setSpecification(newSpecification);
  };

  const handleAddSpecification = () => {
    const newSpecification = [...specification];
    newSpecification.push('');
    setSpecification(newSpecification);
  };

  const handleRemoveSpecification = (index: number) => {
    const newSpecification = [...specification];
    newSpecification.splice(index, 1);
    setSpecification(newSpecification);
  };

  // VehicleForm State

  const handleOnSave = async () => {
    try {
      let success = false;
      const formData = new FormData();
      if (images) {
        for (const [index, image] of images.entries()) {
          if (index === 0) {
            formData.set('images', image);
          } else {
            formData.append('images', image);
          }
        }
      }

      const data: Record<string, unknown> = {
        name,
        vin,
        make,
        model,
        year,
        odometer,
        price,
        color,
        condition,
        assembly,
        transmission,
        fuelType,
        sold: status === 'Sold' ? true : false,
        dateAdded,
      };

      if (status === 'Sold') {
        data.dateSold = dateSold;
        data.soldPrice = soldPrice;
      }

      if (condition === 'Used') {
        data.plateNumber = plateNumber;
        data.taxDate = taxDate;
      }

      description && (data.description = description);
      marketPrice && (data.marketPrice = marketPrice);
      purchasePrice && (data.purchasePrice = purchasePrice);

      const specs = specification.filter((s) => s);
      specs.length > 0 && (data.specification = specs);

      formData.set('data', JSON.stringify(data));

      const response = await axios.post('/api/vehicle/add', formData);

      dispatch(AddVehicleToInventory(response.data));
      clearVehicleForm();
      success = true;
      return success;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return setError(error?.response?.data?.message);
      }
    }
  };

  const handleClearError = () => {
    setError('');
  };

  const clearVehicleForm = () => {
    setError('');
    setName('');
    setImages(null);
    setStatus('Available');
    setDateAdded(new Date(Date.now()));
    setDateSold(null);
    setPrice(null);
    setMarketPrice(null);
    setPurchasePrice(null);
    setSoldPrice(null);
    setCondition('New');
    setPlateNumber('');
    setTaxDate(null);
    setVin('');
    setMake('');
    setModel('');
    setAssembly('');
    setYear(false);
    setOdometer(false);
    setColor('');
    setTransmission('Automatic');
    setFuelType('Petrol');
    setDescription('');
    setSpecification(['']);
  };

  return {
    error,
    images,
    name,
    status,
    dateAdded,
    dateSold,
    price,
    marketPrice,
    purchasePrice,
    soldPrice,
    condition,
    plateNumber,
    taxDate,
    vin,
    make,
    model,
    assembly,
    year,
    odometer,
    color,
    transmission,
    fuelType,
    description,
    specification,
    setError,
    handleClearError,
    onDrop,
    handleOnSave,
    handleVehicleNameChange,
    handleStatusChange,
    handleDateAddedChange,
    handleDateSoldChange,
    handlePriceChange,
    handleMarketPriceChange,
    handlePurchasePriceChange,
    handleSoldPriceChange,
    handleConditionChange,
    handlePlateNumberChange,
    handleTaxDateChange,
    handleVinChange,
    handleMakeChange,
    handleModelChange,
    handleAssemblyChange,
    handleYearChange,
    handleOdometerChange,
    handleColorChange,
    handleTransmissionChange,
    handleFuelTypeChange,
    handleDescriptionChange,
    handleSpecificationChange,
    handleAddSpecification,
    handleRemoveSpecification,
    clearVehicleForm,
  };
};

export default useVehicleForm;
