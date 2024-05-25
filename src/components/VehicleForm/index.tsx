import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Divider,
  Unstable_Grid2 as Grid,
  Button,
} from '@mui/material';

import ErrorAlert from '../ErrorAlert';
import VehicleStatus from './VehicleStatus';
import VehicleDetails from './VehicleDetails';
import VehicleSpecifications from './VehicleSpecifications';

import useVehicleForm from '~/hooks/useVehicleForm';

const VEHICLE_STATUS_AND_PRICING = 'VEHICLE_STATUS_AND_PRICING';
const VEHICLE_DETAILS = 'VEHICLE_DETAILS';
const VEHICLE_SPECIFICATIONS = 'VEHICLE_SPECIFICATIONS';
const VEHICLE_IMAGES = 'VEHICLE_IMAGES';

const process: string[] = [
  VEHICLE_STATUS_AND_PRICING,
  VEHICLE_DETAILS,
  VEHICLE_SPECIFICATIONS,
  VEHICLE_IMAGES,
];

interface VehicleFormProps {
  open: boolean;
  handleCloseForm: () => void;
}

const VehicleForm = ({ open, handleCloseForm }: VehicleFormProps) => {
  const {
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
  } = useVehicleForm();

  const [step, setStep] = useState<number>(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleNextStep = () => {
    switch (process[step]) {
      case VEHICLE_STATUS_AND_PRICING: {
        if (!name || !status || !dateAdded || !price || !condition) {
          setError('Missing required parameter');
          break;
        }

        if (status === 'Sold' && (!price || !dateSold)) {
          setError('Missing required parameter');
          break;
        }

        if (condition === 'Used' && (!plateNumber || !taxDate)) {
          setError('Missing required parameter');
          break;
        }
        setStep((prev) => prev + 1);
        handleClearError();
        break;
      }
      case VEHICLE_DETAILS: {
        if (
          !vin ||
          !make ||
          !model ||
          !assembly ||
          !odometer ||
          !color ||
          !transmission ||
          !fuelType
        ) {
          setError('Missing required Parameter');
          break;
        }
        setStep((prev) => prev + 1);
        handleClearError();
        break;
      }
      case VEHICLE_SPECIFICATIONS: {
        setStep((prev) => prev + 1);
        break;
      }
    }
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleOnCancel = () => {
    clearVehicleForm();
    handleCloseForm();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseForm}
      PaperProps={{
        sx: { width: { xs: '60%', sm: '50%', lg: '40%', xl: '30%' } },
      }}
    >
      <Toolbar />
      <Divider />
      <Grid container p={3} spacing={3}>
        <Grid xs={12}>
          <ErrorAlert error={error} handleClearError={handleClearError} />
        </Grid>
        {step === 0 && (
          <VehicleStatus
            error={error}
            name={name}
            status={status}
            dateAdded={dateAdded}
            dateSold={dateSold}
            price={price}
            marketPrice={marketPrice}
            purchasePrice={purchasePrice}
            condition={condition}
            plateNumber={plateNumber}
            taxDate={taxDate}
            handleVehicleNameChange={handleVehicleNameChange}
            handleStatusChange={handleStatusChange}
            handleDateAddedChange={handleDateAddedChange}
            handleDateSoldChange={handleDateSoldChange}
            handlePriceChange={handlePriceChange}
            handleMarketPriceChange={handleMarketPriceChange}
            handlePurchasePriceChange={handlePurchasePriceChange}
            handleConditionChange={handleConditionChange}
            handlePlateNumberChange={handlePlateNumberChange}
            handleTaxDateChange={handleTaxDateChange}
          />
        )}
        {step === 1 && (
          <VehicleDetails
            error={error}
            vin={vin}
            make={make}
            model={model}
            assembly={assembly}
            year={year}
            odometer={odometer}
            color={color}
            transmission={transmission}
            fuelType={fuelType}
            description={description}
            handleVinChange={handleVinChange}
            handleMakeChange={handleMakeChange}
            handleModelChange={handleModelChange}
            handleAssemblyChange={handleAssemblyChange}
            handleYearChange={handleYearChange}
            handleOdometerChange={handleOdometerChange}
            handleColorChange={handleColorChange}
            handleTransmissionChange={handleTransmissionChange}
            handleFuelTypeChange={handleFuelTypeChange}
            handleDescriptionChange={handleDescriptionChange}
          />
        )}
        {step === 2 && (
          <VehicleSpecifications
            specification={specification}
            handleSpecificationChange={handleSpecificationChange}
            handleAddSpecification={handleAddSpecification}
            handleRemoveSpecification={handleRemoveSpecification}
          />
        )}
        <Grid xs={12} display="flex" justifyContent="end" mt={2}>
          {step === 0 && (
            <Button
              onClick={handleOnCancel}
              onMouseDown={handleMouseDown}
              variant="contained"
              color="error"
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
          )}
          {step > 0 && (
            <Button
              onClick={handlePreviousStep}
              onMouseDown={handleMouseDown}
              variant="contained"
              color="inherit"
              sx={{ mr: 1 }}
            >
              Back
            </Button>
          )}
          {step < process.length - 1 && (
            <Button
              onClick={handleNextStep}
              onMouseDown={handleMouseDown}
              variant="contained"
              color="primary"
              sx={{ ml: 1 }}
            >
              Next
            </Button>
          )}
          {step === process.length - 1 && (
            <Button variant="contained" color="primary" sx={{ ml: 1 }}>
              Save
            </Button>
          )}
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default VehicleForm;
