import type { VehicleData } from '~/redux/reducers/vehicleSlice';
import { useState, useMemo, useCallback } from 'react';
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
import VehicleCard from '~/components/Inventory/VehicleCard';
import { useAppSelector } from '~/redux/store';
import {
  getInventory,
  getInventoryStatus,
} from '~/redux/reducers/inventorySlice';
import Loading from '~/components/Loading';

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
  const [page, setPage] = useState<number>(1);
  const status = useAppSelector(getInventoryStatus);

  const itemsPerPage = useMemo(() => {
    let numOfItems = 10;
    if (isMdUp && !isUltraUp) {
      numOfItems = 12;
    } else if (isUltraUp) {
      numOfItems = 36;
    }
    return numOfItems;
  }, [isMdUp, isUltraUp]);

  const paginationCount = useMemo(
    () =>
      inventory && inventory.length > 0
        ? Math.ceil(inventory.length / itemsPerPage)
        : 0,
    [inventory, itemsPerPage],
  );

  const visibleItems = useMemo(() => {
    if (inventory && inventory.length > 0) {
      const begin = (page - 1) * itemsPerPage;
      const end = begin + itemsPerPage;
      return inventory.slice(begin, end);
    }
    return [];
  }, [inventory, page, itemsPerPage]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleToggleFilter = useCallback(() => {
    setOpenFilter((open) => !open);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleChangePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
      window.scrollTo(0, 0);
    },
    [],
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {isLgUp && (
        <Drawer
          variant="persistent"
          open={openFilter}
          anchor="left"
          PaperProps={{ sx: { bgcolor: 'primary.light' } }}
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
          disableScrollLock
          slotProps={{ backdrop: { invisible: true } }}
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
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <InventoryToolbar onToggleFilter={handleToggleFilter} />
          <Divider />
          <Grid container component={Box} p={2} spacing={2}>
            {status === 'loading' && (
              <Box
                sx={{
                  minHeight: '70vh',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Loading />
              </Box>
            )}
            {status === 'succeeded' &&
              visibleItems.map((vehicle: VehicleData, index: number) => (
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
            {status === 'succeeded' && visibleItems.length === 0 && (
              <Grid
                xs={12}
                sx={{
                  minHeight: '70vh',
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
            {status === 'succeeded' && paginationCount > 1 && (
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
          }}
        >
          <Grid container component={Box} p={2} spacing={2} mt={1}>
            <Toolbar />
            <Grid xs={12}>
              <InventoryToolbar onToggleFilter={handleToggleFilter} />
              <Divider />
            </Grid>
            {status === 'loading' && (
              <Box
                sx={{
                  width: '100%',
                  height: '70vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Loading />
              </Box>
            )}
            {status === 'succeeded' &&
              visibleItems.map((vehicle: VehicleData, index: number) => (
                <Grid
                  key={`${vehicle.name}-card-${index}`}
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <VehicleCard vehicle={vehicle} />
                </Grid>
              ))}
            {status === 'succeeded' && visibleItems.length === 0 && (
              <Grid
                xs={12}
                sx={{
                  height: '70vh',
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
            {status === 'succeeded' && paginationCount > 1 && (
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
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Inventory;
