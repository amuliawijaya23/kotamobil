import { Unstable_Grid2 as Grid, Paper, Typography } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { NumericFormat } from 'react-number-format';

const VehiclePricing = () => {
  const vehicle = useAppSelector(getVehicleData);
  return (
    <Paper sx={{ bgcolor: 'primary.light', mt: 5, width: '100%' }}>
      <Grid container p={2} spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6" component="h6" color="secondary">
            Pricing
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography variant="body1" component="p" color="GrayText">
            Price
          </Typography>
          <Typography
            variant="body1"
            component="p"
            color="inherit"
            fontWeight="bold"
          >
            <NumericFormat
              displayType="text"
              value={vehicle?.price}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        </Grid>
        {vehicle?.marketPrice && (
          <Grid xs={6}>
            <Typography variant="body1" component="p" color="GrayText">
              MSRP
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="inherit"
              fontWeight="bold"
            >
              <NumericFormat
                displayType="text"
                value={vehicle?.marketPrice}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
          </Grid>
        )}
        {vehicle?.purchasePrice && (
          <Grid xs={6}>
            <Typography variant="body1" component="p" color="GrayText">
              Purchase Price
            </Typography>
            <Typography
              variant="body1"
              component="p"
              color="inherit"
              fontWeight="bold"
            >
              <NumericFormat
                displayType="text"
                value={vehicle?.purchasePrice}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
          </Grid>
        )}
        {vehicle?.soldPrice && (
          <Grid xs={6}>
            <Typography variant="body1" component="p" color="GrayText">
              Sold Price
            </Typography>
            <Typography variant="body1" component="p" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={vehicle?.soldPrice}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default VehiclePricing;
