import { useState } from 'react';
import { SelectChangeEvent } from '@mui/material';

// vin,
//   make,
//   model,
//   assembly,
//   year,
//   odometer,
//   color,
//   transmission,
//   fuelType,
//   description,
//   handleVinChange,
//   handleAssemblyChange,
//   handleYearChange,
//   handleOdometerChange,
//   handleColorChange,
//   handleTransmissionChange,
//   handleFuelTypeChange,
//   handleDescriptionChange,

const useVehicleForm = () => {
  // Form error state
  const [error, setError] = useState('');
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

  const handleClearError = () => {
    setError('');
  };

  const clearVehicleForm = () => {
    setError('');
    setName('');
    setStatus('Available');
    setDateAdded(new Date(Date.now()));
    setDateSold(null);
    setPrice(null);
    setMarketPrice(null);
    setPurchasePrice(null);
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
    name,
    status,
    dateAdded,
    dateSold,
    price,
    marketPrice,
    purchasePrice,
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
    handleVehicleNameChange,
    handleStatusChange,
    handleDateAddedChange,
    handleDateSoldChange,
    handlePriceChange,
    handleMarketPriceChange,
    handlePurchasePriceChange,
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
