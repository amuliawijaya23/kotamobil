import React from 'react';
import {
  Divider,
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

import { NumericFormat } from 'react-number-format';

interface VehicleStatusProps {
  error: string;
  name: string;
  status: string;
  dateAdded: Date | null;
  dateSold: Date | null;
  price: string | number | null | undefined;
  marketPrice: string | number | null | undefined;
  purchasePrice: string | number | null | undefined;
  condition: string;
  plateNumber: string;
  taxDate: Date | null;
  handleVehicleNameChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleStatusChange: (e: SelectChangeEvent) => void;
  handleDateAddedChange: (input: Date | null) => void;
  handleDateSoldChange: (input: Date | null) => void;
  handlePriceChange: (value: number | null) => void;
  handleMarketPriceChange: (value: number | null) => void;
  handlePurchasePriceChange: (value: number | null) => void;
  handleConditionChange: (e: SelectChangeEvent) => void;
  handlePlateNumberChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleTaxDateChange: (input: Date | null) => void;
}

const VehicleStatus = ({
  error,
  name,
  status,
  dateAdded,
  dateSold,
  price,
  marketPrice,
  purchasePrice,
  condition,
  plateNumber,
  taxDate,
  handleVehicleNameChange,
  handleStatusChange,
  handleDateAddedChange,
  handleDateSoldChange,
  handlePriceChange,
  handleMarketPriceChange,
  handlePurchasePriceChange,
  handleConditionChange,
  handlePlateNumberChange,
  handleTaxDateChange,
}: VehicleStatusProps) => {
  return (
    <>
      <Grid xs={12}>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          fontWeight="bold"
        >
          Vehicle Status
        </Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Name</InputLabel>
          <OutlinedInput
            onChange={handleVehicleNameChange}
            value={name}
            type="text"
            label="Name"
            error={Boolean(error && !name)}
          />
          {error && !name && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-status-select-label">Status</InputLabel>
          <Select
            size="small"
            labelId="vehicle-status-select-label"
            id="vehicle-status-select"
            value={status}
            label="Status"
            onChange={handleStatusChange}
            error={Boolean(error && !status)}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
          </Select>
          {error && !status && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12}></Grid>
      <Grid xs={12} sm={6}>
        <DatePicker
          onChange={handleDateAddedChange}
          label="Date Added"
          value={dateAdded}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              error: Boolean(error && !dateAdded),
              helperText: error && !dateAdded && `${error}`,
            },
          }}
        />
      </Grid>
      {status === 'Sold' && (
        <Grid xs={12} sm={6}>
          <DatePicker
            onChange={handleDateSoldChange}
            label="Date Sold"
            value={dateSold}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                error: Boolean(error && status === 'Sold' && !dateSold),
                helperText: error && status === 'Sold' && !dateSold && error,
              },
            }}
          />
        </Grid>
      )}
      <Grid xs={12}>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          fontWeight="bold"
        >
          Vehicle Pricing
        </Typography>
        <Divider />
      </Grid>
      <Grid xs={12} sm={6}>
        <NumericFormat
          onValueChange={(values) => {
            if (!values.floatValue) {
              handlePriceChange(null);
            }
            if (values.floatValue) {
              handlePriceChange(values.floatValue);
            }
          }}
          isAllowed={undefined}
          error={Boolean(error && !price)}
          helperText={error && !price && error}
          value={price}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Price"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NumericFormat
          onValueChange={(values) => {
            if (!values.floatValue) {
              handleMarketPriceChange(null);
            }
            if (values.floatValue) {
              handleMarketPriceChange(values.floatValue);
            }
          }}
          value={marketPrice}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Market Price"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NumericFormat
          onValueChange={(values) => {
            if (!values.floatValue) {
              handlePurchasePriceChange(null);
            }
            if (values.floatValue) {
              handlePurchasePriceChange(values.floatValue);
            }
          }}
          value={purchasePrice}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Purchase Price"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
        />
      </Grid>
      <Grid xs={12}>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          fontWeight="bold"
        >
          Vehicle Condition
        </Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <Box sx={{ width: { xs: '100%', sm: '50%', md: '40%' } }}>
          <FormControl size="small" fullWidth>
            <InputLabel id="vehicle-condition-select-label">
              Condition
            </InputLabel>
            <Select
              size="small"
              labelId="vehicle-condition-select-label"
              id="vehicle-condition-select"
              value={condition}
              label="Condition"
              error={Boolean(error && !condition)}
              onChange={handleConditionChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
            {error && !condition && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Box>
      </Grid>
      {condition === 'Used' && (
        <>
          <Grid xs={12} sm={6}>
            <FormControl size="small" fullWidth>
              <InputLabel htmlFor="outlined-vehicle-plate-number">
                Plate Number
              </InputLabel>
              <OutlinedInput
                onChange={handlePlateNumberChange}
                value={plateNumber}
                error={Boolean(error && condition === 'Used' && !plateNumber)}
                type="text"
                label="Plate Number"
              />
              {error && condition === 'Used' && !plateNumber && (
                <FormHelperText error>{error}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <DatePicker
              onChange={handleTaxDateChange}
              label="Tax Date"
              value={taxDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  error: Boolean(error && condition === 'Used' && !taxDate),
                  helperText:
                    error && condition === 'Used' && !taxDate && error,
                },
              }}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default VehicleStatus;
