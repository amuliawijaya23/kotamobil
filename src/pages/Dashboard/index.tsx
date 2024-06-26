import { useCallback } from 'react';
import {
  Unstable_Grid2 as Grid,
  Toolbar,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import Loading from '~/components/Loading';
import SalesByModelChart from '~/components/Dashboard/SalesByModelChart';
import ProfitChart from '~/components/Dashboard/ProfitChart';
import SalesChart from '~/components/Dashboard/SalesChart';
import SalesMetrics from '~/components/Dashboard/SalesMetrics';
import SalesData from '~/components/Dashboard/SalesData';
import ProfitMetrics from '~/components/Dashboard/ProfitMetrics';
import {
  getDashboardStatus,
  setStartDate,
  setEndDate,
  getStartDate,
  getEndDate,
  setPastRange,
  getPastRange,
} from '~/redux/reducers/dashboardSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getDashboardStatus);
  const startDate = useAppSelector(getStartDate);
  const endDate = useAppSelector(getEndDate);
  const pastRange = useAppSelector(getPastRange);

  const handleOnChangeStartDate = useCallback(
    (input: Date | null) => {
      dispatch(setStartDate(JSON.stringify(input)));
    },
    [dispatch],
  );

  const handleOnChangeEndDate = useCallback(
    (input: Date | null) => {
      dispatch(setEndDate(JSON.stringify(input)));
    },
    [dispatch],
  );

  const handleOnChangePastRange = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(setPastRange(Number(event.target.value)));
    },
    [dispatch],
  );

  return (
    <>
      <Toolbar />
      <Toolbar sx={{ mt: 2, p: 2 }}>
        <Grid
          container
          columnSpacing={2}
          rowSpacing={2}
          display="flex"
          justifyContent="center"
        >
          <Grid xs={4}>
            <DatePicker
              onChange={handleOnChangeStartDate}
              value={startDate && JSON.parse(startDate)}
              label="Start Date"
              slotProps={{
                textField: {
                  size: 'small',
                  color: 'secondary',
                  fullWidth: true,
                },
              }}
              maxDate={(endDate && JSON.parse(endDate)) || new Date()}
            />
          </Grid>
          <Grid xs={4}>
            <DatePicker
              onChange={handleOnChangeEndDate}
              value={endDate && JSON.parse(endDate)}
              label="End Date"
              slotProps={{
                textField: {
                  size: 'small',
                  color: 'secondary',
                  fullWidth: true,
                },
              }}
              minDate={startDate && JSON.parse(startDate)}
              maxDate={new Date()}
            />
          </Grid>
          <Grid xs={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="past-range-select-label" color="secondary">
                Past Range
              </InputLabel>
              <Select
                labelId="past-range-select-label"
                value={pastRange.toString()}
                label="Past Range"
                onChange={handleOnChangePastRange}
                color="secondary"
                sx={{
                  minWidth: 90,
                }}
              >
                <MenuItem value={1}>1 year</MenuItem>
                <MenuItem value={2}>2 years</MenuItem>
                <MenuItem value={3}>3 years</MenuItem>
                <MenuItem value={4}>4 years</MenuItem>
                <MenuItem value={5}>5 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Toolbar>
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          component={Box}
          p={2}
          spacing={2}
          sx={{ width: '100%' }}
        >
          {status === 'loading' && (
            <Box
              sx={{
                minHeight: '70vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loading />
            </Box>
          )}
          {status !== 'loading' && (
            <>
              <Grid
                xs={12}
                sm={6}
                md={4}
                sx={{ display: { xs: 'none', md: 'block' } }}
              >
                <SalesMetrics />
                <ProfitMetrics />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <SalesMetrics />
              </Grid>
              <Grid
                xs={12}
                sm={6}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                <ProfitMetrics />
              </Grid>
              <Grid xs={12} md={8}>
                <ProfitChart />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <SalesByModelChart />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <SalesChart />
              </Grid>
              <Grid xs={12}>
                <SalesData />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
