import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { LineChart, LineSeriesType, AxisConfig } from '@mui/x-charts';
import { useAppSelector } from '~/redux/store';
import {
  getMonthsOfInterval,
  getProfitPerMonth,
  getPastProfitPerMonth,
  getTotalProfit,
  getPastTotalProfit,
} from '~/redux/reducers/dashboardSlice';
import { format } from 'date-fns';

const ProfitChart = () => {
  const monthsOfIntervals = useAppSelector(getMonthsOfInterval);
  const profitPerMonth = useAppSelector(getProfitPerMonth);
  const pastProfitPerMonth = useAppSelector(getPastProfitPerMonth);
  const totalProfit = useAppSelector(getTotalProfit);
  const pastTotalProfit = useAppSelector(getPastTotalProfit);

  const series = useMemo(() => {
    if (!totalProfit && !pastTotalProfit) {
      return [];
    }
    return [
      {
        type: 'line',
        label: 'Current',
        data: profitPerMonth,
        color: '#1565c0',
        valueFormatter: (value: number) =>
          `Rp ${value?.toLocaleString('id-ID')}`,
      },
      {
        type: 'line',
        label: 'Past',
        color: '#607d8b',
        data: pastProfitPerMonth,
        valueFormatter: (value) => `Rp ${value?.toLocaleString('id-ID')}`,
      },
    ] as LineSeriesType[];
  }, [totalProfit, pastTotalProfit, profitPerMonth, pastProfitPerMonth]);

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
        title="Monthly Profit"
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 'bold',
        }}
      />
      <CardContent sx={{ height: 300 }}>
        <LineChart
          margin={{ left: 20, right: 0 }}
          series={series}
          xAxis={xSeries}
          yAxis={[
            {
              id: 'profit',
              valueFormatter: (value) => (value / 1000000).toString(),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default ProfitChart;
