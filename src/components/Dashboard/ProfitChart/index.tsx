import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { LineChart, LineSeriesType } from '@mui/x-charts';
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
    if (totalProfit === 0 && pastTotalProfit === 0) {
      return [];
    }
    return [
      {
        type: 'line',
        label: 'Current',
        data: profitPerMonth,
        valueFormatter: (value: number) =>
          `Rp ${value?.toLocaleString('id-ID')}`,
      },
      {
        type: 'line',
        label: 'Past',
        data: pastProfitPerMonth,
        valueFormatter: (value) => `Rp ${value?.toLocaleString('id-ID')}`,
      },
    ] as LineSeriesType[];
  }, [totalProfit, pastTotalProfit, profitPerMonth, pastProfitPerMonth]);

  return (
    <Card>
      <CardHeader
        title="Monthly Profit"
        titleTypographyProps={{
          variant: 'body1',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      />
      <CardContent sx={{ height: 300 }}>
        {profitPerMonth && pastProfitPerMonth && (
          <LineChart
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
                id: 'profit',
                valueFormatter: (value) => (value / 1000000).toString(),
              },
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitChart;
