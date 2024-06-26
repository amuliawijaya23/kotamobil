import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  Unstable_Grid2 as Grid,
  Box,
  Chip,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import SpeedIcon from '@mui/icons-material/Speed';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import { NumericFormat } from 'react-number-format';

import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }: { vehicle: VehicleData }) => {
  const navigate = useNavigate();

  return (
    <Card raised sx={{ position: 'relative', bgcolor: 'primary.light' }}>
      <CardActionArea onClick={() => navigate(`/vehicle/${vehicle._id}`)}>
        <CardMedia
          component="img"
          src={
            vehicle.images && vehicle.images.length > 0
              ? vehicle.images[0].url
              : './src/assets/coming-soon.jpg'
          }
          height="300"
          sx={{ objectFit: 'cover' }}
          alt={vehicle.name}
        />
        <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
          {vehicle.sold && (
            <Chip
              size="small"
              variant="outlined"
              label="SOLD"
              color="secondary"
              icon={<CircleIcon color="secondary" fontSize="small" />}
              sx={{ pr: 1 }}
            />
          )}
        </Box>
        <CardHeader
          title={vehicle.name}
          subheader={
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <NumericFormat
                displayType="text"
                style={{ fontWeight: 'bold' }}
                value={vehicle.price}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Box>
          }
          titleTypographyProps={{
            variant: 'body1',
            component: 'h4',
            fontWeight: 'bold',
            gutterBottom: true,
          }}
          subheaderTypographyProps={{
            variant: 'subtitle1',
            component: 'div',
            gutterBottom: true,
          }}
        />
        <CardContent sx={{ mt: -2 }}>
          <Grid container spacing={1}>
            <Grid
              xs={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <SpeedIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" component="p">
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
              xs={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <LocalGasStationIcon color="inherit" sx={{ mr: 1 }} />
              <Typography
                variant="subtitle2"
                fontSize={'0.65rem'}
                component="p"
              >
                {vehicle.fuelType}
              </Typography>
            </Grid>
            <Grid
              xs={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <DragIndicatorIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" component="p">
                {vehicle.transmission}
              </Typography>
            </Grid>
            <Grid
              xs={6}
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <ColorLensIcon color="inherit" sx={{ mr: 1 }} />
              <Typography variant="subtitle2" component="p">
                {vehicle.color}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default VehicleCard;
