import { Unstable_Grid2 as Grid, Typography, Divider } from '@mui/material';

import { NumericFormat } from 'react-number-format';
import { format } from 'date-fns/format';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { getContactsData } from '~/redux/reducers/contactsSlice';

const VehicleInformation = () => {
  const vehicle = useAppSelector(getVehicleData);
  const contacts = useAppSelector(getContactsData);
  const customerData = vehicle?.sold
    ? contacts?.find((c) => c._id === vehicle.buyerId)
    : null;

  return (
    <>
      <Grid xs={6} display="flex" flexDirection="column">
        {vehicle?.marketPrice && (
          <Typography
            variant="body1"
            component="p"
            sx={{ fontSize: { xs: '0.8em', sm: '1.2em' } }}
          >
            <b>MSRP:</b>{' '}
            <NumericFormat
              displayType="text"
              value={vehicle?.price}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        )}
        <Typography
          variant="body1"
          component="p"
          sx={{ fontSize: { xs: '0.8em', sm: '1.2em' } }}
        >
          <b>Price:</b>{' '}
          <NumericFormat
            displayType="text"
            value={vehicle?.price}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
          />
        </Typography>
      </Grid>
      <Grid xs={6}>
        {vehicle?.purchasePrice && (
          <Typography
            variant="body1"
            component="p"
            sx={{ fontSize: { xs: '0.8em', sm: '1.2em' } }}
          >
            <b>Purchase Price:</b>{' '}
            <NumericFormat
              displayType="text"
              value={vehicle?.purchasePrice}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        )}
        {vehicle?.sold && (
          <Typography
            variant="body1"
            component="p"
            sx={{ fontSize: { xs: '0.8em', sm: '1.2em' } }}
          >
            <b>Sold Price:</b>{' '}
            <NumericFormat
              displayType="text"
              value={vehicle?.soldPrice}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        )}
      </Grid>
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle2" component="p">
          <b>Status:</b> {vehicle?.sold ? 'Sold' : 'Available'}
        </Typography>
        {vehicle?.dateAdded && (
          <Typography variant="subtitle2" component="p">
            <b>Date Added:</b>{' '}
            {format(new Date(vehicle?.dateAdded), 'dd MMM yyyy')}
          </Typography>
        )}
        {vehicle?.sold && vehicle?.dateSold && (
          <Typography variant="subtitle2" component="p">
            <b>Date Sold:</b>{' '}
            {format(new Date(vehicle?.dateSold), 'dd MMM yyyy')}
          </Typography>
        )}
      </Grid>
      <Grid xs={12} sm={6}>
        <Typography variant="subtitle2" component="p">
          <b>VIN:</b> {vehicle?.vin}
        </Typography>
        <Typography variant="subtitle2" component="p">
          <b>Assembly:</b> {vehicle?.assembly}
        </Typography>
      </Grid>

      {vehicle?.sold && vehicle?.buyerId && (
        <Grid xs={12}>
          <Typography variant="subtitle2" component="p">
            <b>Buyer:</b> {customerData?.firstName}
            {customerData?.lastName ? ` ${customerData.lastName}` : ''}
          </Typography>
          <Typography variant="subtitle2" component="p">
            <b>Mobile:</b> {customerData?.mobile}
          </Typography>
        </Grid>
      )}
      <Grid xs={12}>
        <Divider />
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle2" component="p">
          <b>Make:</b> {vehicle?.make}
        </Typography>
        <Typography variant="subtitle2" component="p">
          <b>Model:</b> {vehicle?.model}
        </Typography>
        <Typography variant="subtitle2" component="p">
          <b>Color:</b> {vehicle?.color}
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle2" component="p">
          <b>Condition:</b> {vehicle?.condition}
        </Typography>
        <Typography variant="subtitle2" component="p">
          <b>Year:</b> {vehicle?.year}
        </Typography>

        <Typography variant="subtitle2" component="p">
          <b>Odometer: </b>
          <NumericFormat
            displayType="text"
            value={vehicle?.odometer}
            thousandSeparator="."
            decimalSeparator=","
            suffix=" Km"
          />
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subtitle2" component="p">
          <b>Transmission:</b> {vehicle?.transmission}
        </Typography>
        <Typography variant="subtitle2" component="p">
          <b>Fuel type:</b> {vehicle?.fuelType}
        </Typography>
      </Grid>
      {vehicle?.condition === 'Used' && (
        <Grid xs={6}>
          <Typography variant="subtitle2" component="p">
            <b>Plate Number:</b> {vehicle?.plateNumber}
          </Typography>
          {vehicle?.taxDate && (
            <Typography variant="subtitle2" component="p">
              <b>Tax Date:</b>{' '}
              {format(new Date(vehicle?.taxDate), 'dd MMM yyyy')}
            </Typography>
          )}
        </Grid>
      )}
      {vehicle?.description && (
        <Grid xs={12} mt={2}>
          <Typography variant="body1" component="p" fontWeight="bold">
            Description:
          </Typography>
          <Typography variant="body1" component="p">
            {vehicle?.description}
          </Typography>
        </Grid>
      )}
    </>
  );
};

export default VehicleInformation;
