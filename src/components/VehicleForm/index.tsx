import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Unstable_Grid2 as Grid,
  Snackbar,
  Alert,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import VehicleImages from './VehicleImages';
import VehicleStatus from './VehicleStatus';
import VehicleDetails from './VehicleDetails';
import VehicleSpecifications from './VehicleSpecifications';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import useVehicleForm from '~/hooks/useVehicleForm';

const VEHICLE_STATUS_AND_PRICING = 'VEHICLE_STATUS_AND_PRICING';
const VEHICLE_DETAILS = 'VEHICLE_DETAILS';
const VEHICLE_SPECIFICATIONS = 'VEHICLE_SPECIFICATIONS';
const VEHICLE_IMAGES = 'VEHICLE_IMAGES';

const process: string[] = [
  VEHICLE_STATUS_AND_PRICING,
  VEHICLE_DETAILS,
  VEHICLE_IMAGES,
  VEHICLE_SPECIFICATIONS,
];

interface VehicleFormProps {
  open: boolean;
  handleCloseForm: () => void;
}

const VehicleForm = ({ open, handleCloseForm }: VehicleFormProps) => {
  const {
    error,
    name,
    images,
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
  } = useVehicleForm();

  const vehicle = useAppSelector(getVehicleData);

  const [step, setStep] = useState<number>(0);
  const [alert, setAlert] = useState<string>('');

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

        if (status === 'Sold' && (!soldPrice || !dateSold)) {
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
      case VEHICLE_IMAGES: {
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

  const handleClearAlert = () => {
    setAlert('');
  };

  const onSave = async () => {
    if (await handleOnSave()) {
      clearVehicleForm();
      setAlert(vehicle ? 'Vehicle Updated!' : 'Vehicle Created!');
      handleCloseForm();
      setStep(0);
    }
  };

  return (
    <>
      <Snackbar
        open={Boolean(error || alert)}
        autoHideDuration={6000}
        onClose={error ? handleClearError : handleClearAlert}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={error ? handleClearError : handleClearAlert}
          >
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={error ? handleClearError : handleClearAlert}
          severity={error ? 'error' : 'success'}
        >
          {error ? error : alert}
        </Alert>
      </Snackbar>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleCloseForm}
        PaperProps={{
          sx: { width: { xs: '60%', sm: '50%', lg: '40%', xl: '30%' } },
        }}
      >
        <Toolbar />
        <Grid container p={3} spacing={3}>
          <Grid
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {step === 0 && (
              <Button
                onClick={handleOnCancel}
                onMouseDown={handleMouseDown}
                variant="text"
                color="error"
                sx={{ width: 50 }}
              >
                Cancel
              </Button>
            )}
            {step > 0 && (
              <Button
                onClick={handlePreviousStep}
                onMouseDown={handleMouseDown}
                variant="text"
                color="primary"
                sx={{ width: 50 }}
              >
                Back
              </Button>
            )}
            {step < process.length - 1 && (
              <Button
                onClick={handleNextStep}
                onMouseDown={handleMouseDown}
                variant="text"
                color="primary"
                sx={{ width: 50 }}
              >
                {process[step] == VEHICLE_IMAGES && !images && !vehicle?.images
                  ? 'Skip'
                  : 'Next'}
              </Button>
            )}
            {step === process.length - 1 && (
              <Button
                onClick={onSave}
                onMouseDown={handleMouseDown}
                variant="text"
                color="primary"
                sx={{ width: 50 }}
              >
                Save
              </Button>
            )}
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
              soldPrice={soldPrice}
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
              handleSoldPriceChange={handleSoldPriceChange}
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
          {step === 2 && <VehicleImages images={images} onDrop={onDrop} />}
          {step === 3 && (
            <VehicleSpecifications
              specification={specification}
              handleSpecificationChange={handleSpecificationChange}
              handleAddSpecification={handleAddSpecification}
              handleRemoveSpecification={handleRemoveSpecification}
            />
          )}
        </Grid>
      </Drawer>
    </>
  );
};

export default VehicleForm;
