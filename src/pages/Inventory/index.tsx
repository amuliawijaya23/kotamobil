import React, { useState } from 'react';
import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import {
  Unstable_Grid2 as Grid,
  Box,
  Drawer,
  Toolbar,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import VehicleCard from '~/components/VehicleCard';

import useInventoryData from '~/hooks/useInventoryData';

import { useAppSelector } from '~/redux/store';
import { getInventory } from '~/redux/reducers/inventorySlice';

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

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="left">
        <Toolbar />
        <Divider />
        <List>
          {['Make', 'Model', 'Year', 'Color'].map((text, index) => (
            <ListItem key={`${text}-drawer-item`} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container component={Box} p={3} spacing={2} mt={1}>
        <Grid xs={12}>
          <Toolbar
            component={Box}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>{`${inventory?.length} Vehicle${
                inventory && inventory?.length > 1 ? 's' : ''
              }`}</Typography>
            </Box>
            <Box>
              <Tooltip title="Filter">
                <IconButton
                  onClick={handleToggleDrawer}
                  onMouseDown={handleMouseDown}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add listing">
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
          <Divider />
        </Grid>
        {inventory?.map((vehicle: VehicleData) => (
          <Grid key={`${vehicle.name}-card`} xs={12} sm={4} lg={3} xl={2}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Inventory;
