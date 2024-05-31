import { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Toolbar,
  Divider,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import useVehicleData from '~/hooks/useVehicleData';

import VehicleForm from '~/components/VehicleForm';
import VehicleInformation from '~/components/Vehicle/VehicleInformation';
import VehicleImages from '~/components/Vehicle/VehicleImages';
import VehicleSpecification from '~/components/Vehicle/VehicleSpecification';
import VehicleImageStepper from '~/components/Vehicle/VehicleImageStepper';

const Vehicle = () => {
  useVehicleData();

  const vehicle = useAppSelector(getVehicleData);

  const [open, setOpen] = useState<boolean>(false);
  const [openImages, setOpenImages] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleOpenImages = (index: number) => {
    setActiveStep(index);
    setOpenImages(true);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
  };

  const handleNextActiveStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevActiveStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  if (!vehicle) {
    return <>No DATA</>;
  }

  return (
    <>
      <VehicleForm open={open} onCloseForm={handleCloseForm} />
      <VehicleImageStepper
        open={openImages}
        activeStep={activeStep}
        onNext={handleNextActiveStep}
        onPrev={handlePrevActiveStep}
        onClose={handleCloseImages}
      />
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
                <Tooltip title="Update">
                  <IconButton
                    size="medium"
                    onClick={handleOpenForm}
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
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
