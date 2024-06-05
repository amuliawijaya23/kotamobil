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
  activeStep: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 500, md: 700, xl: 1000, ultra: 1500 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0.1,
};

const VehicleImageStepper = ({
  open,
  activeStep,
  onClose,
  onNext,
  onPrev,
}: VehicleImageStepperProps) => {
  const vehicle = useAppSelector(getVehicleData);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {vehicle?.images && (
          <>
            <Card raised>
              <CardMedia
                component="img"
                src={vehicle.images[activeStep].url}
                srcSet={vehicle?.images[activeStep].url}
                sx={{
                  height: {
                    xs: 320,
                    sm: 400,
                    md: 560,
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
                  onClick={onNext}
                >
                  Next <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  disabled={activeStep === 0}
                  onClick={onPrev}
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
