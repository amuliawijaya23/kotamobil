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

import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import {
  getVehicleFormData,
  getFormAlert,
  setAlert,
  resetAlert,
} from '~/redux/reducers/formSlice';

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
  const { handleOnSave, clearVehicleForm } = useVehicleForm();

  const dispatch = useAppDispatch();

  const vehicle = useAppSelector(getVehicleData);
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const alert = useAppSelector(getFormAlert);

  const [step, setStep] = useState<number>(0);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleNextStep = () => {
    switch (process[step]) {
      case VEHICLE_STATUS_AND_PRICING: {
        if (
          !vehicleFormData.name ||
          !vehicleFormData.status ||
          !vehicleFormData.dateAdded ||
          !vehicleFormData.price ||
          !vehicleFormData.condition
        ) {
          dispatch(
            setAlert({
              message: 'Missing required parameter',
              severity: 'error',
            }),
          );
          break;
        }

        if (
          vehicleFormData.status === 'Sold' &&
          (!vehicleFormData.soldPrice || !vehicleFormData.dateSold)
        ) {
          dispatch(
            setAlert({
              message: 'Missing required parameter',
              severity: 'error',
            }),
          );
          break;
        }

        if (
          vehicleFormData.condition === 'Used' &&
          (!vehicleFormData.plateNumber || !vehicleFormData.taxDate)
        ) {
          dispatch(
            setAlert({
              message: 'Missing required parameter',
              severity: 'error',
            }),
          );
          break;
        }
        setStep((prev) => prev + 1);
        dispatch(resetAlert());
        break;
      }
      case VEHICLE_DETAILS: {
        if (
          !vehicleFormData.vin ||
          !vehicleFormData.make ||
          !vehicleFormData.model ||
          !vehicleFormData.assembly ||
          !vehicleFormData.odometer ||
          !vehicleFormData.color ||
          !vehicleFormData.transmission ||
          !vehicleFormData.fuelType
        ) {
          dispatch(
            setAlert({
              message: 'Missing required parameter',
              severity: 'error',
            }),
          );
          break;
        }
        setStep((prev) => prev + 1);
        dispatch(resetAlert());
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
    dispatch(resetAlert());
  };

  const onSave = async () => {
    if (await handleOnSave()) {
      dispatch(
        setAlert({
          message: vehicle ? 'Vehicle Updated!' : 'Vehicle Created!',
          severity: 'success',
        }),
      );
      clearVehicleForm();
      handleCloseForm();
      setStep(0);
    }
  };

  return (
    <>
      <Snackbar
        open={Boolean(alert)}
        autoHideDuration={6000}
        onClose={handleClearAlert}
        action={
          <IconButton size="small" color="inherit" onClick={handleClearAlert}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClearAlert}
          severity={alert?.severity === 'error' ? 'error' : 'success'}
        >
          {alert?.message}
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
                {process[step] == VEHICLE_IMAGES &&
                !vehicleFormData.images &&
                !vehicle?.images
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
          {step === 0 && <VehicleStatus />}
          {step === 1 && <VehicleDetails />}
          {step === 2 && <VehicleImages />}
          {step === 3 && <VehicleSpecifications />}
        </Grid>
      </Drawer>
    </>
  );
};

export default VehicleForm;
