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
  updatePriceRange,
} from '~/redux/reducers/inventorySlice';

const PriceSlider = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);

  const handlePriceRangeChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) {
        return;
      }
      dispatch(updatePriceRange(newValue as number[]));
    },
    [dispatch],
  );

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold" textAlign="center">
              Price
            </Typography>
          </ListItemText>
        </ListItem>
        <Grid container py={1} display="flex" justifyContent="center">
          <Grid xs={12} display="flex" justifyContent="center">
            <Slider
              color="secondary"
              getAriaLabel={() => 'price range'}
              valueLabelDisplay="off"
              value={queryData?.priceRange}
              onChange={handlePriceRangeChange}
              sx={{ width: 200 }}
              min={queryData.minPrice}
              max={queryData.maxPrice}
            />
          </Grid>
          <Grid xs={5} display="flex" justifyContent="center">
            <Typography variant="subtitle2" fontWeight="bold">
              <NumericFormat
                displayType="text"
                value={queryData.priceRange[0]}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
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
                value={queryData.priceRange[1]}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp "
              />
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default PriceSlider;
