import { useMemo } from 'react';
import {
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useFormikContext, FormikProps, Field, ErrorMessage } from 'formik';
import SelectField from '../SelectField';
import {
  makesAndModels,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/optionsData';

interface VehicleDetailsValues {
  vin: string;
  bodyType: string;
  make: string;
  model: string;
  assembly: string;
  year: number | null;
  odometer: number | null;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
}

const VehicleDetails = () => {
  const {
    setFieldValue,
    values,
    touched,
    errors,
  }: FormikProps<VehicleDetailsValues> =
    useFormikContext<VehicleDetailsValues>();
  const makes = useMemo(() => Object.keys(makesAndModels), []);
  const models = useMemo(
    () =>
      makes.reduce<string[]>((acc, make) => {
        const makeModels = makesAndModels[make as keyof typeof makesAndModels];
        return acc.concat(makeModels);
      }, []),
    [makes],
  );

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
        <Field
          as={TextField}
          name="vin"
          label="Vehicle Identification Number"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.vin && Boolean(errors.vin)}
          helperText={<ErrorMessage name="vin" />}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={SelectField}
          options={bodyType}
          label="Body Type"
          name="bodyType"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Autocomplete
          fullWidth
          autoHighlight
          freeSolo
          value={values.make || ''}
          options={makes}
          getOptionLabel={(option: string) => option}
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(_event, newValue: string | null) =>
            setFieldValue('make', newValue)
          }
          onInputChange={(_event, newValue: string) =>
            setFieldValue('make', newValue)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="make"
              label="Make"
              size="small"
              color="secondary"
              fullWidth
              error={touched.make && Boolean(errors.make)}
              helperText={<ErrorMessage name="make" />}
            />
          )}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Autocomplete
          fullWidth
          autoHighlight
          freeSolo
          value={values.model || ''}
          options={
            values.make && makes.includes(values.make)
              ? makesAndModels[values.make as keyof typeof makesAndModels]
              : models
          }
          isOptionEqualToValue={(option, value) => option === value}
          onChange={(_event, newValue: string | null) =>
            setFieldValue('model', newValue)
          }
          onInputChange={(_event, newValue: string) =>
            setFieldValue('model', newValue)
          }
          renderInput={(params) => (
            <TextField
              {...params}
              name="model"
              label="Model"
              size="small"
              color="secondary"
              fullWidth
              error={touched.model && Boolean(errors.model)}
              helperText={<ErrorMessage name="model" />}
            />
          )}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={SelectField}
          options={assembly}
          name="assembly"
          label="Assembly"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="year"
          label="Year"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          type="number"
          error={touched.year && Boolean(errors.year)}
          helperText={<ErrorMessage name="year" />}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="odometer"
          label="Odometer"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          type="number"
          error={touched.odometer && Boolean(errors.odometer)}
          helperText={<ErrorMessage name="odometer" />}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="color"
          label="Color"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.color && Boolean(errors.color)}
          helperText={<ErrorMessage name="color" />}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={SelectField}
          options={transmission}
          name="transmission"
          label="Transmission"
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={SelectField}
          options={fuelType}
          name="fuelType"
          label="Fuel Type"
        />
      </Grid>
      <Grid xs={12}>
        <Field
          as={TextField}
          name="description"
          label="Description"
          fullWidth
          size="small"
          color="secondary"
          multiline
          rows={3}
          helperText={50 - values.description.length}
        />
      </Grid>
    </>
  );
};

export default VehicleDetails;
