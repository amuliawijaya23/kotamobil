import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Button,

} from '@mui/material';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


const VehicleImageStepper = () => {
  const vehicle = useAppSelector(getVehicleData);
  return (
    // <Grid xs={12}>
    //   <CardMedia
    //     component="img"
    //     height={450}
    //     src={vehicle?.images && vehicle.images[activeStep]}
    //     sx={{ display: 'block', cursor: 'pointer' }}
    //     alt={vehicle?.name}
    //   />
    //   <MobileStepper
    //     variant="dots"
    //     position="static"
    //     steps={(vehicle?.images && vehicle?.images?.length) || 0}
    //     activeStep={activeStep}
    //     nextButton={
    //       <Button
    //         size="small"
    //         disabled={Boolean(
    //           vehicle &&
    //             vehicle.images?.length &&
    //             activeStep === vehicle.images.length - 1,
    //         )}
    //         onClick={() => setActiveStep((prev) => prev + 1)}
    //       >
    //         Next <KeyboardArrowRight />
    //       </Button>
    //     }
    //     backButton={
    //       <Button
    //         size="small"
    //         disabled={activeStep === 0}
    //         onClick={() => setActiveStep((prev) => prev - 1)}
    //       >
    //         <KeyboardArrowLeft /> Back
    //       </Button>
    //     }
    //   />
    // </Grid>
  );
};

export default VehicleImageStepper;
