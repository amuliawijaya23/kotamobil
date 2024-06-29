import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { BarChart, BarSeriesType, AxisConfig } from '@mui/x-charts';
import {
  getMonthsOfInterval,
  getSalesPerMonth,
  getPastSalesPerMonth,
  getTotalSales,
  getPastTotalSales,
} from '~/redux/reducers/dashboardSlice';
import { format } from 'date-fns';

const SalesChart = () => {
  const monthsOfIntervals = useAppSelector(getMonthsOfInterval);
  const salesPerMonth = useAppSelector(getSalesPerMonth);
  const pastSalesPerMonth = useAppSelector(getPastSalesPerMonth);
  const totalSales = useAppSelector(getTotalSales);
  const pastTotalSales = useAppSelector(getPastTotalSales);

  const series = useMemo(() => {
    if (!totalSales && !pastTotalSales) {
      return [];
    }
    return [
      {
        type: 'bar',
        stack: 'total',
        label: 'Current',
        color: '#1565c0',
        data: salesPerMonth,
      },
      {
        type: 'bar',
        stack: 'total',
        label: 'Past',
        color: '#607d8b',
        data: pastSalesPerMonth,
      },
    ] as BarSeriesType[];
  }, [totalSales, pastTotalSales, salesPerMonth, pastSalesPerMonth]);

  const xSeries = useMemo(() => {
    if (!monthsOfIntervals) {
      return [];
    }
    return [
      {
        id: 'months',
        data: JSON.parse(monthsOfIntervals as string) as Date[],
        scaleType: 'band',
        valueFormatter: (value: Date) => format(new Date(value), 'MMM'),
      },
    ] as AxisConfig[];
  }, [monthsOfIntervals]);

  return (
    <Card sx={{ bgcolor: 'primary.light', color: 'secondary.main' }}>
      <CardHeader
        title="Monthly Sales"
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 'bold',
        }}
      />
      <CardContent sx={{ height: 300 }}>
        <BarChart
          margin={{ left: 20, right: 0 }}
          series={series}
          xAxis={xSeries}
          yAxis={[
            {
              id: 'sales',
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default SalesChart;
