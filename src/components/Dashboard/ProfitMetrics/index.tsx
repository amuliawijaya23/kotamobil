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
  getTotalProfit,
  getPastTotalProfit,
} from '~/redux/reducers/dashboardSlice';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { NumericFormat } from 'react-number-format';

const ProfitMetrics = () => {
  const totalProfit = useAppSelector(getTotalProfit);
  const pastTotalProfit = useAppSelector(getPastTotalProfit);

  const profitDelta = useMemo(() => {
    if (totalProfit !== null && pastTotalProfit !== null) {
      return totalProfit - pastTotalProfit;
    }
    return 0;
  }, [totalProfit, pastTotalProfit]);

  return (
    <Card sx={{ mt: { md: 2 } }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid>
            <Typography color="inherit" variant="overline" gutterBottom>
              Current Profit
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={totalProfit}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
            <Typography
              color="inherit"
              variant="overline"
              gutterBottom
              sx={{ mt: 2 }}
            >
              Past Profit
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={pastTotalProfit}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
          </Grid>
          <Grid>
            <Avatar
              sx={{
                height: 50,
                width: 50,
                bgcolor: profitDelta < 0 ? 'error.main' : 'success.main',
              }}
            >
              <MonetizationOnIcon />
            </Avatar>
          </Grid>
        </Grid>
        {profitDelta !== null && pastTotalProfit !== null && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            {profitDelta >= 0 && <ArrowUpwardIcon color="success" />}
            {profitDelta < 0 && <ArrowDownwardIcon color="error" />}
            <Typography
              color={profitDelta < 0 ? 'error' : 'success'}
              sx={{ mr: 1 }}
              variant="caption"
            >
              {profitDelta >= 0 &&
                `${((profitDelta / pastTotalProfit) * 100).toFixed(2)}%`}
              {profitDelta < 0 &&
                `${((profitDelta / pastTotalProfit) * 100).toFixed(2)}%`}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              From Past Profit
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitMetrics;
