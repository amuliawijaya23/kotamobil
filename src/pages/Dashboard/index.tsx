import { Unstable_Grid2 as Grid, Toolbar, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import ProfitChart from '~/components/Dashboard/ProfitChart';
import SalesChart from '~/components/Dashboard/SalesChart';
import {
  setStartDate,
  setEndDate,
  getStartDate,
  getEndDate,
} from '~/redux/reducers/dashboardSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(getStartDate);
  const endDate = useAppSelector(getEndDate);

  const handleOnChangeStartDate = (input: Date | null) => {
    dispatch(setStartDate(JSON.stringify(input)));
  };

  const handleOnChangeEndDate = (input: Date | null) => {
    dispatch(setEndDate(JSON.stringify(input)));
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vw',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Grid container p={2} spacing={2}>
          <Grid xs={12}>
            <Toolbar sx={{ p: 2, mb: 2 }}>
              <DatePicker
                onChange={handleOnChangeStartDate}
                value={startDate && JSON.parse(startDate)}
                label="Start Date"
                slotProps={{ textField: { size: 'small' } }}
                sx={{ mx: 1 }}
              />
              <DatePicker
                onChange={handleOnChangeEndDate}
                value={endDate && JSON.parse(endDate)}
                label="End Date"
                slotProps={{ textField: { size: 'small' } }}
                sx={{ mx: 1 }}
              />
            </Toolbar>
          </Grid>
          <Grid xs={12} md={6}>
            <SalesChart />
          </Grid>
          <Grid xs={12} md={6}>
            <ProfitChart />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
