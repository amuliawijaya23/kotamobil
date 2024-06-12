import { useEffect, useState, useCallback } from 'react';
import {
  Unstable_Grid2 as Grid,
  Toolbar,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { setAlert } from '~/redux/reducers/appSlice';
import { deleteVehicle } from '~/redux/reducers/inventorySlice';
import {
  getVehicleData,
  getVehicleStatus,
} from '~/redux/reducers/vehicleSlice';
import { useNavigate } from 'react-router-dom';
import useVehicleData from '~/hooks/useVehicleData';
import Loading from '~/components/Loading';
import VehicleForm from '~/components/VehicleForm';
import VehicleInformation from '~/components/Vehicle/VehicleInformation';
import VehicleImages from '~/components/Vehicle/VehicleImages';
import VehicleSpecification from '~/components/Vehicle/VehicleSpecification';
import VehicleImageStepper from '~/components/Vehicle/VehicleImageStepper';
import PageNotFound from '../PageNotFound';

const Vehicle = () => {
  useVehicleData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const vehicle = useAppSelector(getVehicleData);
  const status = useAppSelector(getVehicleStatus);
  const [open, setOpen] = useState<boolean>(false);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    if (vehicle?.images && activeStep > vehicle?.images?.length - 1) {
      setActiveStep(vehicle?.images.length - 1);
    }
  }, [vehicle?.images, activeStep]);

  const handleOpenImages = useCallback((index: number) => {
    setActiveStep(index);
    setOpenImages(true);
  }, []);

  const handleCloseImages = useCallback(() => {
    setOpenImages(false);
  }, []);

  const handleOpenForm = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenConfirmation = useCallback(() => {
    setOpenConfirmation(true);
  }, []);

  const handleCloseConfirmation = useCallback(() => {
    setOpenConfirmation(false);
  }, []);

  const handleNextActiveStep = useCallback(() => {
    setActiveStep((prev) => prev + 1);
  }, []);

  const handlePrevActiveStep = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleOnDelete = useCallback(async () => {
    try {
      if (vehicle) {
        const response = await dispatch(deleteVehicle(vehicle._id));

        if (response.meta.requestStatus === 'fulfilled') {
          navigate('/inventory');
          dispatch(
            setAlert({ message: 'Vehicle Deleted!', severity: 'success' }),
          );
        }

        if (response.meta.requestStatus === 'rejected') {
          dispatch(
            setAlert({
              message: response.payload as string,
              severity: 'error',
            }),
          );
        }
      }
    } catch (error) {
      console.error('Error occured while deleting vehicle:', error);
    }
  }, [dispatch, navigate, vehicle]);

  if (status === 'loading') {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading />
      </Box>
    );
  }

  if (!vehicle && status === 'succeeded') {
    return <PageNotFound />;
  }

  return (
    <>
      <VehicleForm open={open} onCloseForm={handleCloseForm} />
      {vehicle?.images && vehicle.images.length > 0 && (
        <VehicleImageStepper
          open={openImages}
          activeStep={activeStep}
          onNext={handleNextActiveStep}
          onPrev={handlePrevActiveStep}
          onClose={handleCloseImages}
        />
      )}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>{'Delete Vehicle'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this vehicle?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={handleOnDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Toolbar />
      <Grid
        container
        p={2}
        spacing={2}
        display="flex"
        justifyContent="center"
        sx={{ mt: { lg: 5, ultra: 20 } }}
      >
        <Grid xs={12} sm={11} md={10} lg={9} ultra={6}>
          <Card>
            <CardHeader
              title={vehicle?.name}
              action={
                <Box>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={handleOpenConfirmation}
                      size="medium"
                      color="inherit"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Update">
                    <IconButton
                      onClick={handleOpenForm}
                      size="medium"
                      color="inherit"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Grid container p={1} spacing={2}>
                <VehicleInformation />
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container p={1} spacing={2}>
                <VehicleSpecification />
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <VehicleImages onOpenImages={handleOpenImages} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Vehicle;
