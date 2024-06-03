import {
  ListItem,
  ListItemText,
  Typography,
  Slider,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getQueryData, updateYearRange } from '~/redux/reducers/inventorySlice';

const YearSlider = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);

  const handleYearRangeChange = (
    _event: Event,
    newValue: number | number[],
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    dispatch(updateYearRange(newValue as number[]));
  };

  return (
    queryData && (
      <>
        <ListItem sx={{ mt: 1 }}>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold" textAlign="center">
              Year
            </Typography>
          </ListItemText>
        </ListItem>
        <Grid container py={2} display="flex" justifyContent="center">
          <Grid xs={12} display="flex" justifyContent="center">
            <Slider
              getAriaLabel={() => 'year range'}
              valueLabelDisplay="off"
              value={queryData.yearRange}
              onChange={handleYearRangeChange}
              sx={{ width: 200 }}
              min={queryData.minYear}
              max={queryData.maxYear}
            />
          </Grid>
          <Grid xs={5} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              {queryData.yearRange[0]}
            </Typography>
          </Grid>
          <Grid xs={2} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              <span>&#8212;</span>
            </Typography>
          </Grid>
          <Grid xs={5} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              {queryData.yearRange[1]}
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default YearSlider;
