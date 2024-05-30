import type { ContactData } from '~/redux/reducers/contactsSlice';
import { useState } from 'react';
import {
  Divider,
  Autocomplete,
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
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';

import ContactForm from '~/components/ContactForm';

import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getVehicleFormData,
  getFormAlert,
  setName,
  setStatus,
  setDateAdded,
  setDateSold,
  setPrice,
  setMarketPrice,
  setPurchasePrice,
  setSoldPrice,
  setCondition,
  setPlateNumber,
  setTaxDate,
} from '~/redux/reducers/formSlice';
import { getContactsData } from '~/redux/reducers/contactsSlice';

interface VehicleStatusProps {
  contact: ContactData | null;
  onBuyerChange: (event: unknown, input: ContactData | null) => void;
}

const VehicleStatus = ({ contact, onBuyerChange }: VehicleStatusProps) => {
  const [openContactForm, setOpenContactForm] = useState<boolean>(false);
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const contacts = useAppSelector(getContactsData);
  const alert = useAppSelector(getFormAlert);

  const dispatch = useAppDispatch();

  const handleOpenContactForm = () => {
    setOpenContactForm(true);
  };

  const handleCloseContactForm = () => {
    setOpenContactForm(false);
  };

  const handleVehicleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setName(event.target.value));
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    dispatch(setStatus(event.target.value));
  };

  const handleDateAddedChange = (input: Date | null) => {
    dispatch(setDateAdded(JSON.stringify(input)));
  };

  const handleDateSoldChange = (input: Date | null) => {
    dispatch(setDateSold(JSON.stringify(input)));
  };

  const handlePriceChange = (value: number | null) => {
    dispatch(setPrice(value));
  };

  const handleMarketPriceChange = (value: number | null) => {
    dispatch(setMarketPrice(value));
  };
  const handlePurchasePriceChange = (value: number | null) => {
    dispatch(setPurchasePrice(value));
  };
  const handleSoldPriceChange = (value: number | null) => {
    dispatch(setSoldPrice(value));
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    dispatch(setCondition(event.target.value));
  };

  const handlePlateNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setPlateNumber(event.target.value));
  };

  const handleTaxDateChange = (input: Date | null) => {
    dispatch(setTaxDate(JSON.stringify(input)));
  };

  return (
    <>
      <ContactForm
        open={openContactForm}
        onCloseForm={handleCloseContactForm}
      />
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
            value={vehicleFormData.name}
            type="text"
            label="Name"
            error={Boolean(alert?.severity == 'error' && !vehicleFormData.name)}
          />
          {alert?.severity == 'error' && !vehicleFormData.name && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-status-select-label">Status</InputLabel>
          <Select
            size="small"
            labelId="vehicle-status-select-label"
            id="vehicle-status-select"
            value={vehicleFormData.status}
            label="Status"
            onChange={handleStatusChange}
            error={Boolean(
              alert?.severity == 'error' && !vehicleFormData.status,
            )}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Sold">Sold</MenuItem>
          </Select>
          {alert?.severity == 'error' && !vehicleFormData.status && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={0} sm={6} md={8}></Grid>
      <Grid xs={12} sm={6}>
        <DatePicker
          onChange={handleDateAddedChange}
          label="Date Added"
          value={JSON.parse(vehicleFormData.dateAdded)}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              error: Boolean(
                alert?.severity == 'error' && !vehicleFormData.dateAdded,
              ),
              helperText:
                alert?.severity == 'error' &&
                !vehicleFormData.dateAdded &&
                `${alert.message}`,
              FormHelperTextProps: { error: true },
            },
          }}
        />
      </Grid>
      {vehicleFormData.status === 'Sold' && (
        <Grid xs={12} sm={6}>
          <DatePicker
            onChange={handleDateSoldChange}
            label="Date Sold"
            value={
              vehicleFormData.dateSold && JSON.parse(vehicleFormData.dateSold)
            }
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                error: Boolean(
                  alert?.severity == 'error' &&
                    vehicleFormData.status === 'Sold' &&
                    !vehicleFormData.dateSold,
                ),
                helperText:
                  alert?.severity == 'error' &&
                  vehicleFormData.status === 'Sold' &&
                  !vehicleFormData.dateSold &&
                  alert?.message,
                FormHelperTextProps: { error: true },
              },
            }}
          />
        </Grid>
      )}
      {vehicleFormData.status === 'Sold' && contacts && (
        <>
          <Grid xs={12} sm={6}>
            <Autocomplete
              fullWidth
              autoHighlight
              options={contacts}
              value={contact}
              getOptionLabel={(option) =>
                `${option.firstName}${
                  option.lastName ? ` ${option.lastName}` : ''
                }`
              }
              onChange={onBuyerChange}
              renderOption={(props, option) => (
                <li {...props} key={`${option._id}-autocomplete`}>
                  {option.firstName}
                  {option.lastName ? ` ${option.lastName}` : ''}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buyer"
                  size="small"
                  error={Boolean(
                    alert?.severity === 'error' &&
                      vehicleFormData.status === 'Sold' &&
                      !vehicleFormData.buyerId,
                  )}
                  helperText={
                    alert?.severity === 'error' &&
                    vehicleFormData.status === 'Sold' &&
                    !vehicleFormData.buyerId &&
                    alert.message
                  }
                  FormHelperTextProps={{ error: true }}
                  inputProps={{ ...params.inputProps }}
                />
              )}
            />
          </Grid>
          <Grid xs={6} ml={-2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Tooltip title="Add Contact">
              <IconButton onClick={handleOpenContactForm} size="small">
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid
            xs={12}
            sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'end' }}
          >
            <Button onClick={handleOpenContactForm}>Add Contact</Button>
          </Grid>
        </>
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
          error={Boolean(alert?.severity == 'error' && !vehicleFormData.price)}
          helperText={
            alert?.severity == 'error' &&
            !vehicleFormData.price &&
            alert.message
          }
          FormHelperTextProps={{ error: true }}
          value={vehicleFormData.price}
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
          isAllowed={undefined}
          value={vehicleFormData.marketPrice}
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
          isAllowed={undefined}
          value={vehicleFormData.purchasePrice}
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
      {vehicleFormData.status === 'Sold' && (
        <Grid xs={12} sm={6}>
          <NumericFormat
            onValueChange={(values) => {
              if (!values.floatValue) {
                handleSoldPriceChange(null);
              }
              if (values.floatValue) {
                handleSoldPriceChange(values.floatValue);
              }
            }}
            isAllowed={undefined}
            error={Boolean(
              alert?.severity == 'error' && !vehicleFormData.soldPrice,
            )}
            helperText={
              alert?.severity == 'error' &&
              vehicleFormData.status === 'Sold' &&
              !vehicleFormData.soldPrice &&
              alert.message
            }
            FormHelperTextProps={{ error: true }}
            value={vehicleFormData.soldPrice}
            fullWidth
            displayType="input"
            customInput={TextField}
            size="small"
            label="Sold Price"
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
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
              value={vehicleFormData.condition}
              label="Condition"
              error={Boolean(
                alert?.severity == 'error' && !vehicleFormData.condition,
              )}
              onChange={handleConditionChange}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
            {alert?.severity == 'error' && !vehicleFormData.condition && (
              <FormHelperText error>{alert.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Grid>
      {vehicleFormData.condition === 'Used' && (
        <>
          <Grid xs={12} sm={6}>
            <FormControl size="small" fullWidth>
              <InputLabel htmlFor="outlined-vehicle-plate-number">
                Plate Number
              </InputLabel>
              <OutlinedInput
                onChange={handlePlateNumberChange}
                value={vehicleFormData.plateNumber}
                error={Boolean(
                  alert?.severity == 'error' &&
                    vehicleFormData.condition === 'Used' &&
                    !vehicleFormData.plateNumber,
                )}
                type="text"
                label="Plate Number"
              />
              {alert?.severity == 'error' &&
                vehicleFormData.condition === 'Used' &&
                !vehicleFormData.plateNumber && (
                  <FormHelperText error>{alert.message}</FormHelperText>
                )}
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <DatePicker
              onChange={handleTaxDateChange}
              label="Tax Date"
              value={
                vehicleFormData.taxDate && JSON.parse(vehicleFormData.taxDate)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  error: Boolean(
                    alert?.severity == 'error' &&
                      vehicleFormData.condition === 'Used' &&
                      !vehicleFormData.taxDate,
                  ),
                  helperText:
                    alert?.severity == 'error' &&
                    vehicleFormData.condition === 'Used' &&
                    !vehicleFormData.taxDate &&
                    alert.message,
                  FormHelperTextProps: { error: true },
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
