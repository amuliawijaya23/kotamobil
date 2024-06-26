import { useState, useCallback, useMemo } from 'react';
import {
  Unstable_Grid2 as Grid,
  Toolbar,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VehicleOverview from '~/components/Vehicle/VehicleOverview';
import VehiclePricing from '~/components/Vehicle/VehiclePricing';
import VehicleSpecifications from '~/components/Vehicle/VehicleSpecifications';
import VehicleImages from '~/components/Vehicle/VehicleImages';
import Loading from '~/components/Loading';
import VehicleImageStepper from '~/components/Vehicle/VehicleImageStepper';
import PageNotFound from '../PageNotFound';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { setAlert } from '~/redux/reducers/appSlice';
import { deleteVehicle } from '~/redux/reducers/inventorySlice';
import {
  getVehicleData,
  getVehicleStatus,
} from '~/redux/reducers/vehicleSlice';
import { getContactsData } from '~/redux/reducers/contactsSlice';
import { useNavigate } from 'react-router-dom';
import useVehicleData from '~/hooks/useVehicleData';
import { format } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import useForms from '~/hooks/useForms';

const Vehicle = () => {
  useVehicleData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const vehicle = useAppSelector(getVehicleData);
  const contacts = useAppSelector(getContactsData);
  const status = useAppSelector(getVehicleStatus);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const { handleToggleVehicleForm } = useForms();

  const customerData = useMemo(
    () =>
      vehicle?.sold ? contacts?.find((c) => c._id === vehicle.buyerId) : null,
    [vehicle, contacts],
  );

  const handleOpenImages = useCallback((index: number) => {
    setActiveStep(index);
    setOpenImages(true);
  }, []);

  const handleCloseImages = useCallback(() => {
    setOpenImages(false);
    setActiveStep(0);
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          container
          spacing={2}
          sx={{
            width: { xs: '100%', lg: '80%', xl: '70%', ultra: '50%' },
            p: { xs: 2, md: 5 },
          }}
        >
          <Grid xs={12} md={3}>
            <Typography variant="h5" component="h4" color="secondary">
              {vehicle?.year}
            </Typography>
            <Typography variant="h4" component="h4" color="secondary">
              {vehicle?.make} {vehicle?.model}
            </Typography>
            <Box>
              <Tooltip title="Update">
                <IconButton
                  onClick={handleToggleVehicleForm}
                  size="medium"
                  color="inherit"
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={handleOpenConfirmation}
                  size="medium"
                  color="inherit"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Typography
              variant="body1"
              component="p"
              sx={{ mt: 2 }}
              color="GrayText"
            >
              VIN
            </Typography>
            <Typography variant="body1" component="p" color="inherit">
              {vehicle?.vin}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ mt: 1 }}
              color="GrayText"
            >
              Date Added
            </Typography>
            <Typography variant="body1" component="p" color="inherit">
              {vehicle?.dateAdded &&
                format(new Date(vehicle.dateAdded), 'dd MM yyy') +
                  ` (${formatDistanceToNow(new Date(vehicle.dateAdded), {
                    addSuffix: true,
                  })})`}
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{ mt: 1 }}
              color="GrayText"
            >
              Condition
            </Typography>
            <Typography variant="body1" component="p" color="inherit">
              {vehicle?.condition}
            </Typography>
            {vehicle?.condition === 'Used' && (
              <>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ mt: 1 }}
                  color="GrayText"
                >
                  Plate Number
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                  {vehicle?.plateNumber}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ mt: 1 }}
                  color="GrayText"
                >
                  Tax Date
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                  {vehicle?.taxDate &&
                    format(new Date(vehicle.taxDate), 'dd MM yyy') +
                      ` (${formatDistanceToNow(new Date(vehicle.taxDate), {
                        addSuffix: true,
                      })})`}
                </Typography>
              </>
            )}
            <Typography
              variant="body1"
              component="p"
              sx={{ mt: 1 }}
              color="GrayText"
            >
              Status
            </Typography>
            <Typography variant="body1" component="p" color="inherit">
              {vehicle?.sold ? 'Sold' : 'Available'}
            </Typography>
            {vehicle?.sold && (
              <>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ mt: 1 }}
                  color="GrayText"
                >
                  Date Sold
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                  {vehicle?.dateSold &&
                    format(new Date(vehicle.dateSold), 'dd MM yyy') +
                      ` (${formatDistanceToNow(new Date(vehicle.dateSold), {
                        addSuffix: true,
                      })})`}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ mt: 1 }}
                  color="GrayText"
                >
                  Buyer
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                  {customerData?.firstName}
                  {customerData?.lastName ? ` ${customerData.lastName}` : ''}
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ mt: 1 }}
                  color="GrayText"
                >
                  Mobile
                </Typography>
                <Typography variant="body1" component="p" color="inherit">
                  {customerData?.mobile}
                </Typography>
              </>
            )}
          </Grid>
          <Grid
            xs={12}
            md={7}
            sx={{
              mt: { xs: 5, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <VehicleOverview />
            <VehiclePricing />
            <VehicleSpecifications />
            <VehicleImages onOpenImages={handleOpenImages} />
          </Grid>
          <Grid xs={0} md={2}></Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Vehicle;
