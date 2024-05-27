import { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Toolbar,
  Divider,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';

import useVehicleData from '~/hooks/useVehicleData';

import VehicleForm from '~/components/VehicleForm';
import VehicleInformation from '~/components/Vehicle/VehicleInformation';
import VehicleImages from '~/components/Vehicle/VehicleImages';
import VehicleSpecification from '~/components/Vehicle/VehicleSpecification';

const Vehicle = () => {
  useVehicleData();

  const vehicle = useAppSelector(getVehicleData);

  const [open, setOpen] = useState(false);

  const handleOpenForm = () => {
    setOpen(true);
  };

  const handleCloseForm = () => {
    setOpen(false);
  };

  if (!vehicle) {
    return <>No DATA</>;
  }

  return (
    <>
      <VehicleForm open={open} handleCloseForm={handleCloseForm} />
      <Toolbar />
      <Grid container p={2} spacing={2} display="flex" justifyContent="center">
        <Grid xs={12} md={10} lg={9} ultra={8}>
          <Card raised>
            <CardHeader
              title={vehicle?.name}
              action={
                <Tooltip title="Update">
                  <IconButton
                    size="medium"
                    onClick={handleOpenForm}
                    color="inherit"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              }
            />
            <Divider />
            <CardContent>
              <Grid container p={1} spacing={2}>
                <VehicleInformation />
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container p={1} spacing={2}>
                <VehicleSpecification />
              </Grid>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <VehicleImages />
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Vehicle;
