import type { CountryType } from '~/helpers/AutocompleteAndSelectData';
import type { ContactFormValues } from '..';
import {
  Box,
  Unstable_Grid2 as Grid,
  Typography,
  Autocomplete,
  TextField,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { countryCodes } from '~/helpers/AutocompleteAndSelectData';

const ContactInformation = () => {
  const { values, touched, errors, setFieldValue } =
    useFormikContext<ContactFormValues>();
  return (
    <>
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="p"
          fontWeight="bold"
          gutterBottom
        >
          Contact Information
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Field
          as={TextField}
          name="firstName"
          label="First Name"
          fullWidth
          size="small"
          variant="outlined"
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={<ErrorMessage name="firstName" />}
        />
      </Grid>
      <Grid xs={12}>
        <Field
          as={TextField}
          name="lastName"
          label="Last Name"
          fullWidth
          size="small"
          variant="outlined"
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={<ErrorMessage name="lastName" />}
        />
      </Grid>
      <Grid xs={12}>
        <Field
          as={TextField}
          name="email"
          label="Email"
          fullWidth
          size="small"
          variant="outlined"
          error={touched.email && Boolean(errors.email)}
          helperText={<ErrorMessage name="email" />}
        />
      </Grid>
      <Grid xs={12}>
        <Field
          as={TextField}
          name="address"
          label="Address"
          fullWidth
          size="small"
          variant="outlined"
          error={touched.address && Boolean(errors.address)}
          helperText={<ErrorMessage name="address" />}
        />
      </Grid>
      <Grid xs={3}>
        <Autocomplete
          autoHighlight
          id="country-select"
          options={countryCodes}
          value={countryCodes.find(
            (country) => country.phone === values.country,
          )}
          isOptionEqualToValue={(option, value) => option.phone === value.phone}
          onChange={(_event, newValue: CountryType | null) =>
            setFieldValue('country', newValue ? newValue.phone : '')
          }
          componentsProps={{ popper: { style: { width: ' fit-content' } } }}
          getOptionLabel={(option) => `+${option.phone}`}
          filterOptions={(options, { inputValue }) => {
            return options.filter((country) =>
              country.label.toLowerCase().includes(inputValue),
            );
          }}
          renderOption={(props, option) => (
            <Box
              {...props}
              key={`${option.code}`}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            >
              <img
                loading="lazy"
                width="20"
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                alt=""
              />
              +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              size="small"
              error={Boolean(touched.country && errors.country)}
              helperText={<ErrorMessage name="country" />}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Grid>
      <Grid xs={9}>
        <NumericFormat
          onValueChange={(values) => {
            setFieldValue('mobile', values.formattedValue);
          }}
          value={values.mobile}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Mobile"
          placeholder="8170031958"
          error={Boolean(touched.mobile && errors.mobile)}
          helperText={<ErrorMessage name="mobile" />}
        />
      </Grid>
    </>
  );
};

export default ContactInformation;
