import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { BarChart, BarSeriesType } from '@mui/x-charts';
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
    if (totalSales === 0 && pastTotalSales === 0) {
      return [];
    }
    return [
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
    ] as BarSeriesType[];
  }, [totalSales, pastTotalSales, salesPerMonth, pastSalesPerMonth]);

  return (
    <Card>
      <CardHeader
        title="Monthly Sales"
        titleTypographyProps={{
          variant: 'body1',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      />
      <CardContent sx={{ height: 300 }}>
        {salesPerMonth && pastSalesPerMonth && (
          <BarChart
            margin={{ left: 20, right: 0 }}
            series={series}
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
      </CardContent>
    </Card>
  );
};

export default SalesChart;
