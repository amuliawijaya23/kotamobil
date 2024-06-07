import React from 'react';
import {
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  Autocomplete,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getVehicleFormData,
  setVin,
  setMake,
  setModel,
  setBodyType,
  setAssembly,
  setYear,
  setOdometer,
  setColor,
  setTransmission,
  setFuelType,
  setDescription,
} from '~/redux/reducers/vehicleFormSlice';
import { getAppAlert } from '~/redux/reducers/appSlice';
import {
  makesAndModels,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/AutocompleteAndSelectData';

const VehicleDetails = () => {
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const alert = useAppSelector(getAppAlert);
  const makes = Object.keys(makesAndModels);
  const models = makes.reduce<string[]>((acc, make) => {
    const makeModels = makesAndModels[make as keyof typeof makesAndModels];
    return acc.concat(makeModels);
  }, []);

  const dispatch = useAppDispatch();

  const handleVinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setVin(event.target.value));
  };

  const handleBodyTypeChange = (event: SelectChangeEvent) => {
    dispatch(setBodyType(event.target.value));
  };

  const handleOnChangeMake = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    dispatch(setMake(value));
  };

  const handleMakeChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    if (value) {
      dispatch(setMake(value));
    }
  };

  const handleOnChangeModel = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    dispatch(setModel(value));
  };

  const handleModelChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string | null,
  ) => {
    if (value) {
      dispatch(setModel(value));
    }
  };

  const handleAssemblyChange = (event: SelectChangeEvent) => {
    dispatch(setAssembly(event.target.value));
  };

  const handleYearChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setYear(Number(event.target.value)));
  };

  const handleOdometerChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setOdometer(Number(event.target.value)));
  };

  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setColor(event.target.value));
  };

  const handleTransmissionChange = (event: SelectChangeEvent) => {
    dispatch(setTransmission(event.target.value));
  };

  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    dispatch(setFuelType(event.target.value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setDescription(event.target.value));
  };

  return (
    <>
      <Grid xs={12}>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          fontWeight="bold"
        >
          Vehicle Details
        </Typography>
        <Divider />
      </Grid>
      <Grid xs={12} sm={6} sx={{ mb: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">
            Vehicle Identification Number
          </InputLabel>
          <OutlinedInput
            value={vehicleFormData.vin}
            onChange={handleVinChange}
            error={Boolean(alert?.severity === 'error' && !vehicleFormData.vin)}
            type="text"
            label="Vehicle Identification Number"
          />
          {alert?.severity === 'error' && !vehicleFormData.vin && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-body-select-label">Body Type</InputLabel>
          <Select
            value={vehicleFormData.bodyType}
            onChange={handleBodyTypeChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.bodyType,
            )}
            size="small"
            labelId="vehicle-body-select-label"
            id="vehicle-body-select"
            label="body Type"
          >
            {bodyType.map((body) => (
              <MenuItem key={`${body}-body-form-selection`} value={body}>
                {body}
              </MenuItem>
            ))}
          </Select>
          {alert?.severity === 'error' && !vehicleFormData.bodyType && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <Autocomplete
          fullWidth
          autoHighlight
          options={makes}
          value={vehicleFormData.make && vehicleFormData.make}
          isOptionEqualToValue={() => true}
          onChange={handleMakeChange}
          onInputChange={handleOnChangeMake}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Make"
              size="small"
              error={Boolean(
                alert?.severity === 'error' && !vehicleFormData.make,
              )}
              helperText={
                alert?.severity === 'error' &&
                !vehicleFormData.make &&
                alert.message
              }
              FormHelperTextProps={{ error: true }}
              inputProps={{ ...params.inputProps }}
            />
          )}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Autocomplete
          fullWidth
          autoHighlight
          options={
            vehicleFormData.make && makes.includes(vehicleFormData.make)
              ? makesAndModels[
                  vehicleFormData.make as keyof typeof makesAndModels
                ]
              : models
          }
          value={vehicleFormData.model && vehicleFormData.model}
          isOptionEqualToValue={() => true}
          onChange={handleModelChange}
          onInputChange={handleOnChangeModel}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Model"
              size="small"
              error={Boolean(
                alert?.severity === 'error' && !vehicleFormData.model,
              )}
              helperText={
                alert?.severity === 'error' &&
                !vehicleFormData.model &&
                alert.message
              }
              FormHelperTextProps={{ error: true }}
              inputProps={{ ...params.inputProps }}
            />
          )}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-assembly-select-label">Assembly</InputLabel>
          <Select
            value={vehicleFormData.assembly}
            onChange={handleAssemblyChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.assembly,
            )}
            size="small"
            labelId="vehicle-assembly-select-label"
            id="vehicle-assembly-select"
            label="Assembly"
          >
            {assembly.map((a) => (
              <MenuItem key={`${a}-assembly-form-selection`} value={a}>
                {a}
              </MenuItem>
            ))}
          </Select>
          {alert?.severity === 'error' && !vehicleFormData.assembly && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-year">Year</InputLabel>
          <OutlinedInput
            value={vehicleFormData.year}
            onChange={handleYearChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.year,
            )}
            type="number"
            label="Year"
          />
          {alert?.severity === 'error' && !vehicleFormData.year && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-odometer">Odometer</InputLabel>
          <OutlinedInput
            value={vehicleFormData.odometer}
            onChange={handleOdometerChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.odometer,
            )}
            type="number"
            label="Odometer"
          />
          {alert?.severity === 'error' && !vehicleFormData.odometer && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-color">Color</InputLabel>
          <OutlinedInput
            value={vehicleFormData.color}
            onChange={handleColorChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.color,
            )}
            type="text"
            label="Color"
          />
          {alert?.severity === 'error' && !vehicleFormData.color && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-transmission-select-label">
            Transmission
          </InputLabel>
          <Select
            value={vehicleFormData.transmission}
            onChange={handleTransmissionChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.transmission,
            )}
            size="small"
            labelId="vehicle-transmission-select-label"
            id="vehicle-transmission-select"
            label="Transmission"
          >
            {transmission.map((t) => (
              <MenuItem key={`${t}-transmission-form-selection`} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
          {alert?.severity === 'error' && !vehicleFormData.transmission && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-fuel-select-label">Fuel Type</InputLabel>
          <Select
            value={vehicleFormData.fuelType}
            onChange={handleFuelTypeChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.fuelType,
            )}
            size="small"
            labelId="vehicle-fuel-select-label"
            id="vehicle-fuel-select"
            label="Fuel Type"
          >
            {fuelType.map((fuel) => (
              <MenuItem key={`${fuel}-fuel-form-selection`} value={fuel}>
                {fuel}
              </MenuItem>
            ))}
          </Select>
          {alert?.severity === 'error' && !vehicleFormData.fuelType && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <TextField
          value={vehicleFormData.description}
          onChange={handleDescriptionChange}
          helperText={50 - vehicleFormData.description.length}
          multiline
          fullWidth
          rows={3}
          label="Description"
        />
      </Grid>
    </>
  );
};

export default VehicleDetails;
