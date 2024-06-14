import { useMemo } from 'react';
import {
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useAppSelector } from '~/redux/store';
import {
  getTotalSales,
  getPastTotalSales,
} from '~/redux/reducers/dashboardSlice';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const SalesMetrics = () => {
  const totalSales = useAppSelector(getTotalSales);
  const pastTotalSales = useAppSelector(getPastTotalSales);

  const salesDelta = useMemo(() => {
    if (totalSales !== null && pastTotalSales !== null) {
      return totalSales - pastTotalSales;
    }
    return 0;
  }, [totalSales, pastTotalSales]);

  const colorIndicator = useMemo(() => {
    if (salesDelta > 0) {
      return 'success';
    }

    if (salesDelta < 0) {
      return 'error';
    }
    return 'info';
  }, [salesDelta]);

  return (
    <Card sx={{ bgcolor: 'primary.light' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid>
            <Typography
              color="secondary"
              fontWeight="bold"
              variant="overline"
              gutterBottom
            >
              Current Sales
            </Typography>
            {totalSales ? (
              <Typography variant="subtitle2" fontWeight="bold">
                {totalSales} Vehicles Sold
              </Typography>
            ) : (
              <Typography variant="subtitle2" fontWeight="bold">
                No Vehicles Sold
              </Typography>
            )}
            <Typography
              color="secondary"
              fontWeight="bold"
              variant="overline"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Past Sales
            </Typography>
            {pastTotalSales ? (
              <Typography variant="subtitle2" fontWeight="bold">
                {pastTotalSales} Vehicles Sold
              </Typography>
            ) : (
              <Typography variant="subtitle2" fontWeight="bold">
                No Vehicles Sold
              </Typography>
            )}
          </Grid>
          <Grid>
            <Avatar
              sx={{
                height: 50,
                width: 50,
                bgcolor: `${colorIndicator}.main`,
              }}
            >
              <DirectionsCarIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          {!salesDelta && !pastTotalSales ? (
            <>
              <HorizontalRuleIcon color="info" />
              <Typography
                color={colorIndicator}
                variant="caption"
                fontWeight="bold"
              >
                0% Change
              </Typography>
            </>
          ) : (
            <>
              {salesDelta === 0 && (
                <HorizontalRuleIcon color={colorIndicator} />
              )}
              {salesDelta > 0 && <ArrowUpwardIcon color={colorIndicator} />}
              {salesDelta < 0 && <ArrowDownwardIcon color={colorIndicator} />}
              <Typography
                color={salesDelta < 0 ? 'error' : 'success'}
                sx={{ mr: 1 }}
                variant="caption"
                fontWeight="bold"
              >
                {!pastTotalSales && `100% `}
                {pastTotalSales &&
                  `${((salesDelta / pastTotalSales) * 100).toFixed(2)}% Change`}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesMetrics;
