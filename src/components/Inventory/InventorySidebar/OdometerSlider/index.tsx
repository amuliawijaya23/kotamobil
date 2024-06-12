import { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Slider,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getQueryData,
  updateOdometerRange,
} from '~/redux/reducers/inventorySlice';

const OdometerSlider = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);

  const handleOdometerRangeChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      dispatch(updateOdometerRange(newValue as number[]));
    },
    [dispatch],
  );

  return (
    queryData && (
      <>
        <ListItem sx={{ mt: 1 }}>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold" textAlign="center">
              Odometer
            </Typography>
          </ListItemText>
        </ListItem>
        <Grid container py={2} display="flex" justifyContent="center">
          <Grid xs={12} display="flex" justifyContent="center">
            <Slider
              color="secondary"
              getAriaLabel={() => 'odometer range'}
              valueLabelDisplay="off"
              value={queryData.odometerRange}
              onChange={handleOdometerRangeChange}
              sx={{ width: 200 }}
              min={queryData.minOdometer}
              max={queryData.maxOdometer}
            />
          </Grid>
          <Grid xs={5} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={queryData.odometerRange[0]}
                thousandSeparator="."
                decimalSeparator=","
                suffix=" Km"
              />
            </Typography>
          </Grid>
          <Grid xs={2} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              <span>&#8212;</span>
            </Typography>
          </Grid>
          <Grid xs={5} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={queryData.odometerRange[1]}
                thousandSeparator="."
                decimalSeparator=","
                suffix=" Km"
              />
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default OdometerSlider;
