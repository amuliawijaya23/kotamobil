import { useMemo } from 'react';
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

  // split vehicle specifications into arrays of 3
  const specifications = useMemo(() => {
    const specArrays = [];
    if (vehicle?.specification && vehicle.specification?.length > 0) {
      for (let i = 0; i < vehicle?.specification?.length; i += 3) {
        const chunkArray = vehicle.specification.slice(i, i + 3);
        specArrays.push(chunkArray);
      }
    }
    return specArrays;
  }, [vehicle?.specification]);

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
        <Grid xs={12}>
          <List sx={{ listStyleType: 'disc' }} disablePadding>
            <Grid container p={2} display="flex" alignItems="center">
              {specifications.map((specArray, index) => (
                <Grid key={`spec-array-${index}`} xs={6} sm={4} lg={3}>
                  {specArray.map((spec) => (
                    <ListItem
                      key={`vehicle-spec-${spec}`}
                      sx={{ display: 'list-item' }}
                      disablePadding
                    >
                      <ListItemText>{spec}</ListItemText>
                    </ListItem>
                  ))}
                </Grid>
              ))}
            </Grid>
          </List>
        </Grid>
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
