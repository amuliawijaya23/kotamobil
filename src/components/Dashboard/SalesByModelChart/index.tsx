import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { useAppSelector } from '~/redux/store';
import {
  getSalesByModel,
  getPastSalesByModel,
  getTotalSales,
  getPastTotalSales,
} from '~/redux/reducers/dashboardSlice';

const SalesByModelChart = () => {
  const salesByModel = useAppSelector(getSalesByModel);
  const pastSalesByModel = useAppSelector(getPastSalesByModel);
  const totalSales = useAppSelector(getTotalSales);
  const pastTotalSales = useAppSelector(getPastTotalSales);
  const [currentData, setCurrentData] = useState<boolean>(true);

  const handleOnChangeCurrentData = () => {
    setCurrentData((prev) => !prev);
  };

  return (
    <Card>
      <CardHeader
        title="Sales By Model"
        titleTypographyProps={{
          variant: 'body1',
          fontWeight: 'bold',
        }}
        action={
          <Button
            size="small"
            color="info"
            variant="outlined"
            onClick={handleOnChangeCurrentData}
            sx={{ minWidth: 125 }}
          >
            {currentData ? 'See Past Data' : 'See Current Data'}
          </Button>
        }
      />
      <CardContent
        sx={{
          height: 300,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {currentData &&
          salesByModel &&
          (totalSales === 0 ? (
            <Typography variant="body1" fontWeight="bold" textAlign="center">
              No Data Found
            </Typography>
          ) : (
            <PieChart
              series={[
                {
                  data: salesByModel.map((sale, index) => ({
                    id: index,
                    value: sale.sale,
                    label: sale.model,
                  })),
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'gray',
                  },
                },
              ]}
            />
          ))}
        {!currentData &&
          pastSalesByModel &&
          (pastTotalSales === 0 ? (
            <Typography variant="body1" fontWeight="bold" textAlign="center">
              No Data Found
            </Typography>
          ) : (
            <PieChart
              series={[
                {
                  data: pastSalesByModel.map((sale, index) => ({
                    id: index,
                    value: sale.sale,
                    label: sale.model,
                  })),
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: 'gray',
                  },
                },
              ]}
            />
          ))}
      </CardContent>
    </Card>
  );
};

export default SalesByModelChart;
