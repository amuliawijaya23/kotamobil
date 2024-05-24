import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  Icon,
  CardContent,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { NumericFormat } from 'react-number-format';

const VehicleCard = ({ vehicle }: { vehicle: VehicleData }) => {
  return (
    <Card raised>
      <CardActionArea>
        <CardMedia
          component="img"
          src={
            vehicle.images ? vehicle.images[0] : './src/assets/coming-soon.jpg'
          }
          height="250"
          sx={{ objectFit: 'cover' }}
          alt={vehicle.name}
        />
        <CardHeader
          title={vehicle.name}
          subheader={
            <NumericFormat
              displayType="text"
              value={vehicle.price}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          }
          titleTypographyProps={{
            variant: 'h6',
            component: 'h4',
            gutterBottom: true,
          }}
          subheaderTypographyProps={{
            variant: 'subtitle1',
            component: 'p',
            gutterBottom: true,
          }}
        />
        <CardContent>
          <Grid container>
            <Grid
              xs={4}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <SpeedIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="body2" component="p">
                <NumericFormat
                  displayType="text"
                  value={vehicle.odometer}
                  thousandSeparator="."
                  decimalSeparator=","
                  suffix=" Km"
                />
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <LocalGasStationIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="body2" component="p">
                {vehicle.fuelType}
              </Typography>
            </Grid>
            <Grid
              xs={4}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <DragIndicatorIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="body2" component="p">
                {vehicle.transmission}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VehicleCard;
