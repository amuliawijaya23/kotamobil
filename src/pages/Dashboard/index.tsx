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
import SalesByModelChart from '~/components/Dashboard/SalesByModelChart';
import ProfitChart from '~/components/Dashboard/ProfitChart';
import SalesChart from '~/components/Dashboard/SalesChart';
import SalesMetrics from '~/components/Dashboard/SalesMetrics';
import SalesData from '~/components/Dashboard/SalesData';
import ProfitMetrics from '~/components/Dashboard/ProfitMetrics';
import {
  setStartDate,
  setEndDate,
  getStartDate,
  getEndDate,
  setPastRange,
  getPastRange,
} from '~/redux/reducers/dashboardSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector(getStartDate);
  const endDate = useAppSelector(getEndDate);
  const pastRange = useAppSelector(getPastRange);

  const handleOnChangeStartDate = (input: Date | null) => {
    dispatch(setStartDate(JSON.stringify(input)));
  };

  const handleOnChangeEndDate = (input: Date | null) => {
    dispatch(setEndDate(JSON.stringify(input)));
  };

  const handleOnChangePastRange = (event: SelectChangeEvent) => {
    dispatch(setPastRange(Number(event.target.value)));
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
              <FormControl size="small">
                <InputLabel id="past-range-select-label">Past Range</InputLabel>
                <Select
                  labelId="past-range-select-label"
                  value={pastRange.toString()}
                  label="Past Range"
                  onChange={handleOnChangePastRange}
                  sx={{ minWidth: 100 }}
                >
                  <MenuItem value={1}>1 year</MenuItem>
                  <MenuItem value={2}>2 years</MenuItem>
                  <MenuItem value={3}>3 years</MenuItem>
                  <MenuItem value={4}>4 years</MenuItem>
                  <MenuItem value={5}>5 years</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={4}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            <SalesMetrics />
            <ProfitMetrics />
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: { xs: 'block', md: 'none' } }}>
            <SalesMetrics />
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: { xs: 'block', md: 'none' } }}>
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
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
