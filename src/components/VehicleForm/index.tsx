import React, { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Unstable_Grid2 as Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Loading from '../Loading';
import VehicleImages from './VehicleImages';
import VehicleStatus from './VehicleStatus';
import VehicleDetails from './VehicleDetails';
import VehicleSpecifications from './VehicleSpecifications';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { getVehicleFormData } from '~/redux/reducers/vehicleFormSlice';
import { setAlert, resetAlert } from '~/redux/reducers/appSlice';
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
  onCloseForm: () => void;
}

const VehicleForm = ({ open, onCloseForm }: VehicleFormProps) => {
  const {
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
  } = useVehicleForm();

  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(getVehicleData);
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const [step, setStep] = useState<number>(0);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const showAlert = () => {
    dispatch(
      setAlert({
        message: 'Missing required parameter',
        severity: 'error',
      }),
    );
  };

  const isVehicleStatusValid = () => {
    if (
      !vehicleFormData.name ||
      !vehicleFormData.status ||
      !vehicleFormData.dateAdded ||
      !vehicleFormData.price ||
      !vehicleFormData.condition
    ) {
      return false;
    }

    if (
      vehicleFormData.status === 'Sold' &&
      (!vehicleFormData.soldPrice || !vehicleFormData.dateSold || !contact)
    ) {
      return false;
    }

    if (
      vehicleFormData.condition === 'Used' &&
      (!vehicleFormData.plateNumber || !vehicleFormData.taxDate)
    ) {
      return false;
    }
    return true;
  };

  const isVehicleDetailsValid = () => {
    return (
      vehicleFormData.vin &&
      vehicleFormData.bodyType &&
      vehicleFormData.make &&
      vehicleFormData.model &&
      vehicleFormData.assembly &&
      vehicleFormData.odometer &&
      vehicleFormData.color &&
      vehicleFormData.transmission &&
      vehicleFormData.fuelType
    );
  };

  const handleNextStep = () => {
    switch (process[step]) {
      case VEHICLE_STATUS_AND_PRICING: {
        if (!isVehicleStatusValid()) {
          showAlert();
          break;
        }
        setStep((prev) => prev + 1);
        dispatch(resetAlert());
        break;
      }
      case VEHICLE_DETAILS: {
        if (!isVehicleDetailsValid()) {
          showAlert();
          break;
        }
        setStep((prev) => prev + 1);
        dispatch(resetAlert());
        break;
      }
      default: {
        setStep((prev) => prev + 1);
        break;
      }
    }
  };

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const onClose = () => {
    onCloseForm();
    clearVehicleForm();
    setStep(0);
  };

  const onSave = async () => {
    if (await handleOnSave()) {
      onCloseForm();
      setStep(0);
    }
  };

  return (
    <>
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>
          {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {vehicle
              ? 'Are you sure you want to update this vehicle?'
              : 'Are you sure you want to add this vehicle?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={onSave} onMouseDown={handleMouseDown}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{
          sx: { width: { xs: '60%', sm: '50%', lg: '40%', xl: '30%' } },
        }}
      >
        <Toolbar />
        {loading && <Loading />}
        {!loading && (
          <Grid container p={3} spacing={3}>
            <Grid
              xs={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {step === 0 && (
                <Button
                  onClick={onClose}
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
                  !images &&
                  !vehicle?.images
                    ? 'Skip'
                    : 'Next'}
                </Button>
              )}
              {step === process.length - 1 && (
                <Button
                  onClick={handleOpenConfirmation}
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
                contact={contact}
                onBuyerChange={handleBuyerChange}
              />
            )}
            {step === 1 && <VehicleDetails />}
            {step === 2 && (
              <VehicleImages
                images={images}
                vehicleImages={vehicleImages}
                onDrop={onDrop}
                onRemoveVehicleImages={handleRemoveVehicleImages}
                onRemoveUploadedImages={handleRemoveUploadedImages}
              />
            )}
            {step === 3 && <VehicleSpecifications />}
          </Grid>
        )}
      </Drawer>
    </>
  );
};

export default VehicleForm;
