import type { CountryType } from '~/helpers/selectData';
import {
  Box,
  Unstable_Grid2 as Grid,
  Typography,
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';

import { useAppSelector } from '~/redux/store';
import { getFormAlert } from '~/redux/reducers/formSlice';
import { getContactFormData } from '~/redux/reducers/formSlice';

import { countryCodes } from '~/helpers/selectData';

interface ContactInformationProps {
  isValidEmail: boolean;
  country: CountryType | null;
  onFirstNameChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onLastNameChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onEmailChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCountryChange: (event: unknown, values: CountryType | null) => void;
  onMobileChange: (input: string) => void;
  onAddressChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ContactInformation = ({
  isValidEmail,
  country,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onCountryChange,
  onMobileChange,
  onAddressChange,
}: ContactInformationProps) => {
  const contactFormData = useAppSelector(getContactFormData);
  const alert = useAppSelector(getFormAlert);

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
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">First Name</InputLabel>
          <OutlinedInput
            value={contactFormData.firstName}
            onChange={onFirstNameChange}
            error={Boolean(
              alert?.severity === 'error' && !contactFormData.firstName,
            )}
            type="text"
            label="First Name"
          />

          <FormHelperText
            error={Boolean(
              alert?.severity === 'error' && !contactFormData.firstName,
            )}
          >
            {alert?.severity === 'error' && !contactFormData.firstName ? (
              <>{alert.message}</>
            ) : (
              'Required'
            )}
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Last Name</InputLabel>
          <OutlinedInput
            value={contactFormData.lastName}
            onChange={onLastNameChange}
            type="text"
            label="Last Name"
          />
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Email</InputLabel>
          <OutlinedInput
            value={contactFormData.email}
            onChange={onEmailChange}
            error={Boolean(
              !isValidEmail &&
                contactFormData.email &&
                contactFormData?.email?.length > 0,
            )}
            type="email"
            label="Last Name"
          />
          {!isValidEmail && contactFormData.email && (
            <FormHelperText>Invalid email address</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid xs={12}>
        <FormControl size="small" fullWidth>
          <InputLabel htmlFor="outlined-vehicle-name">Address</InputLabel>
          <OutlinedInput
            value={contactFormData.address}
            onChange={onAddressChange}
            type="text"
            label="Address"
          />
        </FormControl>
      </Grid>
      <Grid xs={4}>
        <Autocomplete
          id="country-select"
          options={countryCodes}
          value={country}
          onChange={onCountryChange}
          autoHighlight
          componentsProps={{ popper: { style: { width: ' fit-content' } } }}
          getOptionLabel={(option) => option.label}
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
              {option.code} +{option.phone}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Country"
              size="small"
              helperText={
                alert?.severity === 'error' &&
                contactFormData.mobile.length < 10 &&
                'Missing required parameters'
              }
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Grid>
      <Grid xs={8}>
        <NumericFormat
          onValueChange={(values) => {
            onMobileChange(values.formattedValue);
          }}
          isAllowed={undefined}
          error={Boolean(
            alert?.severity === 'error' && contactFormData.mobile.length < 10,
          )}
          helperText={
            alert?.severity == 'error' && contactFormData.mobile.length < 10
              ? alert.message
              : 'Required'
          }
          FormHelperTextProps={{
            error: Boolean(
              alert?.severity === 'error' && contactFormData.mobile.length < 10,
            ),
          }}
          value={contactFormData.mobile}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Mobile"
          prefix="+"
        />
      </Grid>
    </>
  );
};

export default ContactInformation;
