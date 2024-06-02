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
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InventoryToolbar from '~/components/Inventory/InventoryToolbar';
import InventorySidebar from '~/components/Inventory/InventorySidebar';
import VehicleForm from '~/components/VehicleForm';
import VehicleCard from '~/components/Inventory/VehicleCard';
import { useAppSelector } from '~/redux/store';
import { getInventory } from '~/redux/reducers/inventorySlice';

const drawerWidth = 250;

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
  const isXsUp = useMediaQuery(theme.breakpoints.up('xs'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isUltraUp = useMediaQuery(theme.breakpoints.up('ultra'));
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

  let itemsPerPage = 10;

  if (isMdUp && !isUltraUp) {
    itemsPerPage = 12;
  } else if (isUltraUp) {
    itemsPerPage = 36;
  }

  const paginationCount =
    inventory && inventory.length > 0
      ? Math.ceil(inventory.length / itemsPerPage)
      : 0;

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
      return inventory.slice(begin, end);
    }
    return [];
  }, [inventory, page, itemsPerPage]);

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
        <Drawer
          open={openFilter}
          anchor="left"
          onClose={handleCloseFilter}
          PaperProps={{ sx: { width: drawerWidth } }}
        >
          <Toolbar />
          <Divider />
          <InventorySidebar />
        </Drawer>
      )}
      {isLgUp && (
        <Main
          open={openFilter}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Toolbar />
          <Grid container component={Box} p={2} spacing={2}>
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
            {visibleItems.length === 0 && (
              <Grid
                xs={12}
                sx={{
                  height: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="p" textAlign="center">
                  Looks like we couldn't find any vehicles. Try changing your
                  filters or add a new vehicle to your inventory
                </Typography>
              </Grid>
            )}
            {paginationCount > 1 && (
              <Grid xs={12} mt={2}>
                <Toolbar
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
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
            )}
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
            {visibleItems.length === 0 && (
              <Grid
                xs={12}
                sx={{
                  height: 500,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" component="p" textAlign="center">
                  Looks like we couldn't find any vehicles. Try changing your
                  filters or add a new vehicle to your inventory
                </Typography>
              </Grid>
            )}
            <Grid xs={12} mt={2}>
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
