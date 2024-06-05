import { Paper, Typography } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { BarChart } from '@mui/x-charts';
import {
  getMonthsOfInterval,
  getSalesPerMonth,
  getPastSalesPerMonth,
} from '~/redux/reducers/dashboardSlice';
import { format } from 'date-fns';

const SalesChart = () => {
  const monthsOfIntervals = useAppSelector(getMonthsOfInterval);
  const salesPerMonth = useAppSelector(getSalesPerMonth);
  const pastSalesPerMonth = useAppSelector(getPastSalesPerMonth);

  return (
    <>
      <Paper sx={{ height: 300, p: 2 }}>
        <Typography variant="h6" textAlign="center" sx={{ mt: 1, mb: 1 }}>
          Sales
        </Typography>
        {salesPerMonth && pastSalesPerMonth && (
          <BarChart
            sx={{ mb: 3 }}
            margin={{ left: 20, right: 0 }}
            series={[
              {
                type: 'bar',
                stack: 'total',
                label: 'Current',
                data: salesPerMonth,
              },
              {
                type: 'bar',
                stack: 'total',
                label: 'Past',
                data: pastSalesPerMonth,
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
                id: 'sales',
              },
            ]}
          />
        )}
      </Paper>
    </>
  );
};

export default SalesChart;
