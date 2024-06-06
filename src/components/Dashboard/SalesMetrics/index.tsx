import { useMemo } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useAppSelector } from '~/redux/store';
import {
  getTotalSales,
  getPastTotalSales,
} from '~/redux/reducers/dashboardSlice';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const SalesMetrics = () => {
  const totalSales = useAppSelector(getTotalSales);
  const pastTotalSales = useAppSelector(getPastTotalSales);

  const salesDelta = useMemo(() => {
    if (totalSales !== null && pastTotalSales !== null) {
      return totalSales - pastTotalSales;
    }
    return 0;
  }, [totalSales, pastTotalSales]);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid>
            <Typography color="inherit" variant="overline" gutterBottom>
              Current Sales
            </Typography>
            {totalSales && totalSales > 0 ? (
              <Typography variant="subtitle2" fontWeight="bold">
                {totalSales} Vehicles Sold
              </Typography>
            ) : (
              <Typography variant="subtitle2" fontWeight="bold">
                No Vehicle Sold
              </Typography>
            )}
            <Typography
              color="inherit"
              variant="overline"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Past Sales
            </Typography>
            {pastTotalSales && pastTotalSales > 0 ? (
              <Typography variant="subtitle2" fontWeight="bold">
                {pastTotalSales} Vehicles Sold
              </Typography>
            ) : (
              <Typography variant="subtitle2" fontWeight="bold">
                No Vehicle Sold
              </Typography>
            )}
          </Grid>
          <Grid>
            <Avatar
              sx={{
                height: 50,
                width: 50,
                bgcolor: salesDelta < 0 ? 'error.main' : 'success.main',
              }}
            >
              <DirectionsCarIcon />
            </Avatar>
          </Grid>
        </Grid>
        {salesDelta !== null && pastTotalSales !== null && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {salesDelta >= 0 && <ArrowUpwardIcon color="success" />}
            {salesDelta < 0 && <ArrowDownwardIcon color="error" />}
            <Typography
              color={salesDelta < 0 ? 'error' : 'success'}
              sx={{ mr: 1 }}
              variant="caption"
            >
              {salesDelta >= 0 &&
                `${((salesDelta / pastTotalSales) * 100).toFixed(2)}%`}
              {salesDelta < 0 &&
                `${((salesDelta / pastTotalSales) * 100).toFixed(2)}%`}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              From Past Sales
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SalesMetrics;
