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

interface VehicleDetailsProps {
  error: string;
  vin: string;
  make: string;
  model: string;
  assembly: string;
  year: number | boolean;
  odometer: number | boolean;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
  handleVinChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleMakeChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleModelChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleAssemblyChange: (e: SelectChangeEvent) => void;
  handleYearChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleOdometerChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleColorChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleTransmissionChange: (e: SelectChangeEvent) => void;
  handleFuelTypeChange: (e: SelectChangeEvent) => void;
  handleDescriptionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const VehicleDetails = ({
  error,
  vin,
  make,
  model,
  assembly,
  year,
  odometer,
  color,
  transmission,
  fuelType,
  description,
  handleVinChange,
  handleMakeChange,
  handleModelChange,
  handleAssemblyChange,
  handleYearChange,
  handleOdometerChange,
  handleColorChange,
  handleTransmissionChange,
  handleFuelTypeChange,
  handleDescriptionChange,
}: VehicleDetailsProps) => {
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
      <Grid xs={12} sx={{ mb: 2 }}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">
            Vehicle Identification Number
          </InputLabel>
          <OutlinedInput
            value={vin}
            onChange={handleVinChange}
            error={Boolean(error && !vin)}
            type="text"
            label="Vehicle Identification Number"
          />
          {error && !vin && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Make</InputLabel>
          <OutlinedInput
            value={make}
            onChange={handleMakeChange}
            error={Boolean(error && !make)}
            type="text"
            label="Make"
          />
          {error && !make && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Model</InputLabel>
          <OutlinedInput
            value={model}
            onChange={handleModelChange}
            error={Boolean(error && !model)}
            type="text"
            label="Model"
          />
          {error && !model && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-assembly-select-label">Assembly</InputLabel>
          <Select
            value={assembly}
            onChange={handleAssemblyChange}
            error={Boolean(error && !assembly)}
            size="small"
            labelId="vehicle-assembly-select-label"
            id="vehicle-assembly-select"
            label="Assembly"
          >
            <MenuItem value="Complete-Knock-Down">Complete-Knock-Down</MenuItem>
            <MenuItem value="Complete-Built-Up">Complete-Built-Up</MenuItem>
          </Select>
          {error && !assembly && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-year">Year</InputLabel>
          <OutlinedInput
            value={year}
            onChange={handleYearChange}
            error={Boolean(error && !year)}
            type="number"
            label="Year"
          />
          {error && !year && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-odometer">Odometer</InputLabel>
          <OutlinedInput
            value={odometer}
            onChange={handleOdometerChange}
            error={Boolean(error && !odometer)}
            type="number"
            label="Odometer"
          />
          {error && !odometer && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-color">Color</InputLabel>
          <OutlinedInput
            value={color}
            onChange={handleColorChange}
            error={Boolean(error && !color)}
            type="text"
            label="Color"
          />
          {error && !color && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-transmission-select-label">
            Transmission
          </InputLabel>
          <Select
            value={transmission}
            onChange={handleTransmissionChange}
            error={Boolean(error && !transmission)}
            size="small"
            labelId="vehicle-transmission-select-label"
            id="vehicle-transmission-select"
            label="Transmission"
          >
            <MenuItem value="Automatic">Automatic</MenuItem>
            <MenuItem value="Manual">Manual</MenuItem>
          </Select>
          {error && !transmission && (
            <FormHelperText error>{error}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl size="small" fullWidth>
          <InputLabel id="vehicle-fuel-select-label">Fuel Type</InputLabel>
          <Select
            value={fuelType}
            onChange={handleFuelTypeChange}
            error={Boolean(error && !fuelType)}
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
          {error && !fuelType && <FormHelperText error>{error}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <TextField
          value={description}
          onChange={handleDescriptionChange}
          helperText={50 - description.length}
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
