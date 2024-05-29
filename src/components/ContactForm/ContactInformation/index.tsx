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
  handleFirstNameChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleLastNameChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleEmailChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleCountryChange: (event: unknown, values: CountryType | null) => void;
  handleMobileChange: (input: string) => void;
  handleAddressChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ContactInformation = ({
  isValidEmail,
  country,
  handleFirstNameChange,
  handleLastNameChange,
  handleEmailChange,
  handleCountryChange,
  handleMobileChange,
  handleAddressChange,
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
            onChange={handleFirstNameChange}
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
            onChange={handleLastNameChange}
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
            onChange={handleEmailChange}
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
            onChange={handleAddressChange}
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
          onChange={handleCountryChange}
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
            handleMobileChange(values.formattedValue);
          }}
          isAllowed={undefined}
          error={Boolean(alert?.severity == 'error' && !contactFormData.mobile)}
          helperText={
            alert?.severity == 'error' && !contactFormData.mobile
              ? alert.message
              : 'Required'
          }
          FormHelperTextProps={{
            error: Boolean(
              alert?.severity == 'error' && !contactFormData.mobile,
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
