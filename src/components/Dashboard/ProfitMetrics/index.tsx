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
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
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

  const colorIndicator = useMemo(() => {
    if (profitDelta > 0) {
      return 'success';
    }

    if (profitDelta < 0) {
      return 'error';
    }
    return 'info';
  }, [profitDelta]);

  return (
    <Card sx={{ mt: { md: 2 } }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid>
            <Typography color="inherit" variant="overline" gutterBottom>
              Current Profit
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              {totalProfit ? (
                <NumericFormat
                  displayType="text"
                  value={totalProfit}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                />
              ) : (
                <NumericFormat
                  displayType="text"
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                />
              )}
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
              {pastTotalProfit ? (
                <NumericFormat
                  displayType="text"
                  value={pastTotalProfit}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                />
              ) : (
                <NumericFormat
                  displayType="text"
                  value={0}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                />
              )}
            </Typography>
          </Grid>
          <Grid>
            <Avatar
              sx={{
                height: 50,
                width: 50,
                bgcolor: `${colorIndicator}.main`,
              }}
            >
              <MonetizationOnIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          {!profitDelta && !pastTotalProfit ? (
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
              {profitDelta === 0 && (
                <HorizontalRuleIcon color={colorIndicator} />
              )}
              {profitDelta > 0 && <ArrowUpwardIcon color={colorIndicator} />}
              {profitDelta < 0 && <ArrowDownwardIcon color={colorIndicator} />}
              <Typography
                color={colorIndicator}
                sx={{ mr: 1 }}
                variant="caption"
              >
                {!pastTotalProfit && `100% `}
                {pastTotalProfit &&
                  `${((profitDelta / pastTotalProfit) * 100).toFixed(
                    2,
                  )}% Change`}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfitMetrics;
