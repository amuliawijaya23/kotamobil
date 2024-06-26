import { Unstable_Grid2 as Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { NumericFormat } from 'react-number-format';

const VehicleOverview = () => {
  const vehicle = useAppSelector(getVehicleData);
  return (
    <Paper sx={{ bgcolor: 'primary.light', width: '100%' }}>
      <Grid container p={2} spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6" component="h6" color="secondary">
            Overview
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography variant="body1" component="p" color="GrayText">
            Year
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.year}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Color
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.color}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Odometer
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            <NumericFormat
              displayType="text"
              value={vehicle?.odometer}
              thousandSeparator="."
              decimalSeparator=","
              suffix=" Km"
            />
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography variant="body1" component="p" color="GrayText">
            Make
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.make}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Body Type
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.bodyType}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Transmission
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.transmission}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Typography variant="body1" component="p" color="GrayText">
            Model
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.model}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Fuel Type
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.fuelType}
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="GrayText"
            sx={{ mt: 2 }}
          >
            Assembly
          </Typography>
          <Typography variant="body1" component="p" color="inherit">
            {vehicle?.assembly}
          </Typography>
        </Grid>
        <Grid xs={12} mt={1}>
          <Typography
            variant="body1"
            component="p"
            fontWeight="bold"
            color="secondary"
          >
            Description
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="inherit"
            sx={{ mt: 1 }}
          >
            {vehicle?.description
              ? vehicle.description
              : 'No description has been added for this vehicle'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VehicleOverview;
