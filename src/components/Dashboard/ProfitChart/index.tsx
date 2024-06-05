import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { LineChart } from '@mui/x-charts';
import {
  getMonthsOfInterval,
  getProfitPerMonth,
  getPastProfitPerMonth,
} from '~/redux/reducers/dashboardSlice';
import { format } from 'date-fns';

const ProfitChart = () => {
  const monthsOfIntervals = useAppSelector(getMonthsOfInterval);
  const profitPerMonth = useAppSelector(getProfitPerMonth);
  const pastProfitPerMonth = useAppSelector(getPastProfitPerMonth);

  return (
    <>
      <Paper sx={{ height: 300, p: 2 }}>
        <Typography variant="h6" textAlign="center" sx={{ mt: 1, mb: 1 }}>
          Profit
        </Typography>
        {profitPerMonth && pastProfitPerMonth && (
          <LineChart
            sx={{ mb: 3 }}
            margin={{ left: 20, right: 0 }}
            series={[
              {
                type: 'line',
                label: 'Current',
                data: profitPerMonth,
                valueFormatter: (value) =>
                  `Rp ${value?.toLocaleString('id-ID')}`,
              },
              {
                type: 'line',
                label: 'Past',
                data: pastProfitPerMonth,
                valueFormatter: (value) =>
                  `Rp ${value?.toLocaleString('id-ID')}`,
              },
            ]}
            xAxis={[
              {
                id: 'months',
                data: JSON.parse(monthsOfIntervals as string) as Date[],
                scaleType: 'band',
                valueFormatter: (value) => format(new Date(value), 'MMM'),
              },
            ]}
            yAxis={[
              {
                id: 'profit',
                valueFormatter: (value) => (value / 1000000).toString(),
              },
            ]}
          />
        )}
      </Paper>
    </>
  );
};

export default ProfitChart;
