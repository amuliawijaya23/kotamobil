import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Unstable_Grid2 as Grid,
  Box,
  Drawer,
  Toolbar,
  Divider,
  Pagination,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const inventory = useAppSelector(getInventory);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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

  const itemsPerPage = 12;

  const paginationCount =
    inventory && inventory.length > 0 ? Math.ceil(inventory.length / 12) : 0;

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const visibleItems = useMemo(() => {
    if (inventory && inventory.length > 0) {
      const begin = (page - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      console.log('Showing items from index:', begin, 'to', end);
      return inventory.slice(begin, end);
    }
    return [];
  }, [inventory, page]);

  return (
    <Box sx={{ display: 'flex' }}>
      {isLgUp && (
        <Drawer
          variant="persistent"
          open={openFilter}
          anchor="left"
          sx={{
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
      )}
      {isXsUp && !isLgUp && (
        <Drawer open={openFilter} anchor="left" onClose={handleCloseFilter}>
          <Toolbar />
          <Divider />
          <InventorySidebar />
        </Drawer>
      )}
      {isLgUp && (
        <Main open={openFilter} sx={{ justifyContent: 'center' }}>
          <Grid container component={Box} p={2} spacing={2} width="100%">
            <Toolbar />
            <Grid xs={12}>
              <InventoryToolbar
                onToggleFilter={handleToggleFilter}
                onToggleForm={handleToggleForm}
              />
              <Divider />
            </Grid>
            {visibleItems.map((vehicle: VehicleData, index: number) => (
              <Grid
                key={`${vehicle.name}-card-${index}`}
                xs={12}
                sm={4}
                lg={3}
                xl={2}
                ultra={1}
              >
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
            <Grid xs={12} mt={2}>
              <Divider />
              <Toolbar
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <Pagination
                  count={paginationCount}
                  size="large"
                  onChange={handleChangePage}
                  onMouseDown={handleMouseDown}
                  page={page}
                />
              </Toolbar>
            </Grid>
          </Grid>
        </Main>
      )}
      {isXsUp && !isLgUp && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Grid
            container
            component={Box}
            p={2}
            spacing={2}
            mt={1}
            width="100%"
            height="100%"
          >
            <Toolbar />
            <Grid xs={12}>
              <InventoryToolbar
                onToggleFilter={handleToggleFilter}
                onToggleForm={handleToggleForm}
              />
              <Divider />
            </Grid>
            {visibleItems.map((vehicle: VehicleData, index: number) => (
              <Grid key={`${vehicle.name}-card-${index}`} xs={12} sm={6} md={4}>
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
            <Grid xs={12} mt={2}>
              <Divider />
              <Toolbar
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 1,
                }}
              >
                <Pagination
                  count={paginationCount}
                  size="large"
                  onChange={handleChangePage}
                  onMouseDown={handleMouseDown}
                  page={page}
                />
              </Toolbar>
            </Grid>
          </Grid>
        </Box>
      )}

      <VehicleForm open={openForm} onCloseForm={handleCloseForm} />
    </Box>
  );
};

export default Inventory;
