import {
  Button,
  Modal,
  Box,
  Card,
  CardMedia,
  MobileStepper,
} from '@mui/material';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface VehicleImageStepperProps {
  open: boolean;
  handleOnClose: () => void;
  activeStep: number;
  handleNextActiveStep: () => void;
  handlePrevActiveStep: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 600, md: 800, lg: 900, xl: 1000, ultra: 1500 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0.1,
};

const VehicleImageStepper = ({
  open,
  handleOnClose,
  activeStep,
  handleNextActiveStep,
  handlePrevActiveStep,
}: VehicleImageStepperProps) => {
  const vehicle = useAppSelector(getVehicleData);

  return (
    <Modal open={open} onClose={handleOnClose}>
      <Box sx={style}>
        {vehicle?.images && (
          <>
            <Card raised>
              <CardMedia
                component="img"
                src={vehicle.images[activeStep]}
                srcSet={vehicle?.images[activeStep]}
                sx={{
                  height: {
                    xs: 400,
                    sm: 480,
                    md: 640,
                    lg: 720,
                    xl: 800,
                    ultra: 1200,
                  },
                }}
              />
            </Card>
            <MobileStepper
              variant="dots"
              position="static"
              steps={(vehicle?.images && vehicle?.images?.length) || 0}
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  disabled={Boolean(
                    vehicle &&
                      vehicle.images?.length &&
                      activeStep === vehicle.images.length - 1,
                  )}
                  onClick={handleNextActiveStep}
                >
                  Next <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  disabled={activeStep === 0}
                  onClick={handlePrevActiveStep}
                >
                  <KeyboardArrowLeft /> Back{' '}
                </Button>
              }
            />
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VehicleImageStepper;
