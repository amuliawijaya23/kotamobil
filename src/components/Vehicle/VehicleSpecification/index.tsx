import {
  Unstable_Grid2 as Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

const VehicleSpecification = () => {
  const vehicle = useAppSelector(getVehicleData);

  return (
    <>
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="p"
          gutterBottom
          fontWeight="bold"
        >
          Specification
        </Typography>
      </Grid>
      {vehicle?.specification && vehicle?.specification.length > 0 ? (
        <>
          <Grid xs={12}>
            <List sx={{ listStyleType: 'disc' }}>
              <Grid container p={2} display="flex" alignItems="center">
                {vehicle?.specification.map((spec) => (
                  <Grid xs={6} sm={4} lg={3}>
                    <ListItem key={spec} sx={{ display: 'list-item' }}>
                      <ListItemText>{spec}</ListItemText>
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </List>
          </Grid>
        </>
      ) : (
        <Grid xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1" component="p" textAlign="start">
              This vehicle currently has no specifications listed. You can add
              vehicle details and specifications using the form provided by
              clicking the Update button.
            </Typography>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default VehicleSpecification;
