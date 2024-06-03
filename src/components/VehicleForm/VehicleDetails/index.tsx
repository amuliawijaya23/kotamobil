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

const VehicleDetails = () => {
  const vehicleFormData = useAppSelector(getVehicleFormData);
  const alert = useAppSelector(getAppAlert);

  const dispatch = useAppDispatch();

  const handleVinChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setVin(event.target.value));
  };

  const handleBodyTypeChange = (event: SelectChangeEvent) => {
    dispatch(setBodyType(event.target.value));
  };

  const handleMakeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setMake(event.target.value));
  };

  const handleModelChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setModel(event.target.value));
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
            <MenuItem value="Sedan">Sedan</MenuItem>
            <MenuItem value="SUV">SUV</MenuItem>
            <MenuItem value="MPV">MPV</MenuItem>
            <MenuItem value="Coupe">Coupe</MenuItem>
            <MenuItem value="Hatchback">Hatchback</MenuItem>
            <MenuItem value="Sport">Sport</MenuItem>
            <MenuItem value="Convertible">Convertible</MenuItem>
            <MenuItem value="Pickup">Pickup</MenuItem>
          </Select>
          {alert?.severity === 'error' && !vehicleFormData.bodyType && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Make</InputLabel>
          <OutlinedInput
            value={vehicleFormData.make}
            onChange={handleMakeChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.make,
            )}
            type="text"
            label="Make"
          />
          {alert?.severity === 'error' && !vehicleFormData.make && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Model</InputLabel>
          <OutlinedInput
            value={vehicleFormData.model}
            onChange={handleModelChange}
            error={Boolean(
              alert?.severity === 'error' && !vehicleFormData.model,
            )}
            type="text"
            label="Model"
          />
          {alert?.severity === 'error' && !vehicleFormData.model && (
            <FormHelperText error>{alert.message}</FormHelperText>
          )}
        </FormControl>
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
            <MenuItem value="Complete-Knock-Down">Complete-Knock-Down</MenuItem>
            <MenuItem value="Complete-Built-Up">Complete-Built-Up</MenuItem>
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
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
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
            <MenuItem value="Petrol">Petrol</MenuItem>
            <MenuItem value="Diesel">Diesel</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
            <MenuItem value="Electric">Electric</MenuItem>
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
