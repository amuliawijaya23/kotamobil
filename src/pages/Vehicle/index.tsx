import { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Typography,
  Toolbar,
  Divider,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  ImageList,
  ImageListItem,
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { format } from 'date-fns/format';
import { NumericFormat } from 'react-number-format';

import useVehicleData from '~/hooks/useVehicleData';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import VehicleForm from '~/components/VehicleForm';

const IMAGES = 'IMAGES';
const SPECIFICATIONS = 'SPECIFICATIONS';

const Vehicle = () => {
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  let imageListCol = 1;

  if (isMdUp) {
    imageListCol = 3;
  } else if (isSmUp && !isMdUp) {
    imageListCol = 2;
  }

  useVehicleData();

  const vehicle = useAppSelector(getVehicleData);

  const [display, setDisplay] = useState(IMAGES);
  const [open, setOpen] = useState(false);

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  const handleDisplayImages = () => {
    setDisplay(IMAGES);
  };

  const handleDisplaySpecifications = () => {
    setDisplay(SPECIFICATIONS);
  };

  if (!vehicle) {
    return <>No DATA</>;
  }

  return (
    <>
      <VehicleForm open={open} handleCloseForm={handleCloseForm} />
      <Toolbar />
      <Grid container p={3} spacing={3} display="flex" justifyContent="center">
        <Grid xs={12} md={8}>
          <Card raised>
            <CardHeader
              title={vehicle?.name}
              action={
                <Button onClick={handleOpenForm} variant="contained">
                  Update
                </Button>
              }
            />
            <Divider />
            <CardContent>
              <Grid container p={1} spacing={2}>
                <Grid xs={6} display="flex" flexDirection="column">
                  {vehicle.marketPrice && (
                    <Typography
                      variant="body1"
                      component="p"
                      fontSize={'1.2em'}
                    >
                      <b>MSRP:</b>{' '}
                      <NumericFormat
                        displayType="text"
                        value={vehicle.price}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                      />
                    </Typography>
                  )}
                  <Typography variant="body1" component="p" fontSize={'1.2em'}>
                    <b>Price:</b>{' '}
                    <NumericFormat
                      displayType="text"
                      value={vehicle.price}
                      thousandSeparator="."
                      decimalSeparator=","
                      prefix="Rp "
                    />
                  </Typography>
                </Grid>
                {vehicle.sold && (
                  <Grid xs={6}>
                    <Typography
                      variant="body1"
                      component="p"
                      fontSize={'1.2em'}
                    >
                      <b>Sold Price:</b>{' '}
                      <NumericFormat
                        displayType="text"
                        value={vehicle.soldPrice}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="Rp "
                      />
                    </Typography>
                  </Grid>
                )}
                <Grid xs={12}>
                  <Divider />
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="p">
                    <b>Status:</b> {vehicle.sold ? 'Sold' : 'Available'}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Date Added:</b>{' '}
                    {format(new Date(vehicle.dateAdded), 'dd MMM yyyy')}
                  </Typography>
                  {vehicle.sold && vehicle.dateSold && (
                    <Typography variant="subtitle2" component="p">
                      <b>Date Sold:</b>{' '}
                      {format(new Date(vehicle.dateSold), 'dd MMM yyyy')}
                    </Typography>
                  )}
                </Grid>
                <Grid xs={12} sm={6}>
                  <Typography variant="subtitle2" component="p">
                    <b>VIN:</b> {vehicle.vin}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Assembly:</b> {vehicle.assembly}
                  </Typography>
                </Grid>
                <Grid xs={12}>
                  <Divider />
                </Grid>

                <Grid xs={6}>
                  <Typography variant="subtitle2" component="p">
                    <b>Make:</b> {vehicle.make}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Model:</b> {vehicle.model}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Color:</b> {vehicle.color}
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="p">
                    <b>Condition:</b> {vehicle.condition}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Year:</b> {vehicle.year}
                  </Typography>

                  <Typography variant="subtitle2" component="p">
                    <b>Odometer: </b>
                    <NumericFormat
                      displayType="text"
                      value={vehicle.odometer}
                      thousandSeparator="."
                      decimalSeparator=","
                      suffix=" Km"
                    />
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="subtitle2" component="p">
                    <b>Transmission:</b> {vehicle.transmission}
                  </Typography>
                  <Typography variant="subtitle2" component="p">
                    <b>Fuel type:</b> {vehicle.fuelType}
                  </Typography>
                </Grid>
                {vehicle.condition === 'Used' && (
                  <Grid xs={6}>
                    <Typography variant="subtitle2" component="p">
                      <b>Plate Number:</b> {vehicle.plateNumber}
                    </Typography>
                    {vehicle.taxDate && (
                      <Typography variant="subtitle2" component="p">
                        <b>Tax Date:</b>{' '}
                        {format(new Date(vehicle.taxDate), 'dd MMM yyyy')}
                      </Typography>
                    )}
                  </Grid>
                )}
                {vehicle.description && (
                  <Grid xs={12} mt={2}>
                    <Typography variant="body1" component="p" fontWeight="bold">
                      Description:
                    </Typography>
                    <Typography variant="body1" component="p">
                      {vehicle.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions>
              <Toolbar>
                <Button
                  variant={display === IMAGES ? 'contained' : 'text'}
                  sx={{ width: 150, mr: 0.5 }}
                  onClick={handleDisplayImages}
                >
                  Images
                </Button>
                <Button
                  variant={display === SPECIFICATIONS ? 'contained' : 'text'}
                  sx={{ width: 150 }}
                  onClick={handleDisplaySpecifications}
                >
                  Specifications
                </Button>
              </Toolbar>
            </CardActions>
            <Divider />
            <CardContent sx={{ minHeight: 255 }}>
              <Grid container>
                {display === IMAGES &&
                  (vehicle.images ? (
                    <Grid xs={12}>
                      <ImageList
                        cols={imageListCol}
                        rowHeight={250}
                        sx={{
                          height: 505,
                        }}
                      >
                        {vehicle.images.map((image, index) => (
                          <ImageListItem key={`vehicle-display-image-${index}`}>
                            <img
                              loading="lazy"
                              alt={`image`}
                              srcSet={`${image}`}
                              src={`${image}`}
                              style={{ height: 240 }}
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </Grid>
                  ) : (
                    <Grid xs={12}>
                      <Box
                        sx={{
                          height: 200,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          variant="body1"
                          component="p"
                          textAlign="center"
                        >
                          This vehicle currently has no images. You can upload
                          images using the form provided by clicking the Update
                          button.
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Vehicle;
