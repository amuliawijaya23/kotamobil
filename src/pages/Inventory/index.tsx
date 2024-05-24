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

import InventoryToolbar from '~/components/InventoryToolbar';
import InventorySidebar from '~/components/InventorySidebar';
import VehicleCard from '~/components/VehicleCard';

import useInventoryData from '~/hooks/useInventoryData';

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
  useInventoryData();

  const inventory = useAppSelector(getInventory);

  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="persistent"
        open={open}
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
        open={open}
        anchor="left"
        onClose={handleCloseDrawer}
        PaperProps={{ sx: { width: drawerWidth } }}
        sx={{
          display: { xs: 'block', lg: 'none' },
        }}
      >
        <Toolbar />
        <Divider />
        <InventorySidebar />
      </Drawer>
      <Main open={open} sx={{ display: { xs: 'none', lg: 'flex' } }}>
        <Grid container component={Box} p={2} spacing={2} mt={1} width="100%">
          <Grid xs={12}>
            <InventoryToolbar handleToggleDrawer={handleToggleDrawer} />
            <Divider />
          </Grid>
          {inventory?.map((vehicle: VehicleData) => (
            <Grid key={`${vehicle.name}-card`} xs={12} sm={4} lg={3} xl={2}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Main>
      <Box sx={{ display: { xs: 'flex', lg: 'none' }, width: '100%' }}>
        <Grid container component={Box} p={2} spacing={2} mt={1} width="100%">
          <Grid xs={12}>
            <InventoryToolbar handleToggleDrawer={handleToggleDrawer} />
            <Divider />
          </Grid>
          {inventory?.map((vehicle: VehicleData) => (
            <Grid
              key={`${vehicle.name}-card`}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={3}
            >
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Inventory;
