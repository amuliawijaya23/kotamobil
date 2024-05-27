import type { VehicleData } from '~/redux/reducers/vehicleSlice';

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Unstable_Grid2 as Grid,
  Box,
  Drawer,
  Toolbar,
  Divider,
} from '@mui/material';

import InventoryToolbar from '~/components/Inventory/InventoryToolbar';
import InventorySidebar from '~/components/Inventory/InventorySidebar';
import VehicleForm from '~/components/VehicleForm';
import VehicleCard from '~/components/Inventory/VehicleCard';

import { useAppSelector } from '~/redux/store';
import { getInventory } from '~/redux/reducers/inventorySlice';

const drawerWidth = 200;

const Main = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Inventory = () => {
  const inventory = useAppSelector(getInventory);

  const [openFilter, setOpenFilter] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const handleToggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleToggleForm = () => {
    setOpenForm(!openForm);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        open={openFilter}
        anchor="left"
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <InventorySidebar />
      </Drawer>
      <Drawer
        open={openFilter}
        anchor="left"
        onClose={handleCloseFilter}
        PaperProps={{ sx: { width: drawerWidth } }}
        sx={{
          display: { xs: 'block', lg: 'none' },
        }}
      >
        <Toolbar />
        <Divider />
        <InventorySidebar />
      </Drawer>
      <Main
        open={openFilter}
        sx={{ display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}
      >
        <Grid container component={Box} p={2} spacing={2} width="100%">
          <Toolbar />
          <Grid xs={12}>
            <InventoryToolbar
              handleToggleFilter={handleToggleFilter}
              handleToggleForm={handleToggleForm}
            />
            <Divider />
          </Grid>
          {inventory?.map((vehicle: VehicleData) => (
            <Grid
              key={`${vehicle.name}-card`}
              xs={12}
              sm={4}
              lg={3}
              xl={2}
              ultra={1}
            >
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Main>
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Grid container component={Box} p={2} spacing={2} mt={1} width="100%">
          <Toolbar />
          <Grid xs={12}>
            <InventoryToolbar
              handleToggleFilter={handleToggleFilter}
              handleToggleForm={handleToggleForm}
            />
            <Divider />
          </Grid>
          {inventory?.map((vehicle: VehicleData) => (
            <Grid key={`${vehicle.name}-card`} xs={12} sm={6} md={4}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <VehicleForm open={openForm} handleCloseForm={handleCloseForm} />
    </Box>
  );
};

export default Inventory;
