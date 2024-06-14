import type { ContactData } from '~/redux/reducers/contactsSlice';
import { useState, useCallback } from 'react';
import {
  Divider,
  Autocomplete,
  Box,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  IconButton,
  Button,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import AddIcon from '@mui/icons-material/Add';
import SelectField from '../SelectField';
import ContactForm from '~/components/ContactForm';
import { useFormikContext, Field, ErrorMessage } from 'formik';
import { useAppSelector } from '~/redux/store';
import { getContactsData } from '~/redux/reducers/contactsSlice';
import { condition, status } from '~/helpers/AutocompleteAndSelectData';

interface VehicleStatusValues {
  name: string;
  status: string;
  dateAdded: Date | null;
  dateSold: Date | null;
  buyerId: string;
  price: number | null;
  marketPrice: number | null;
  purchasePrice: number | null;
  soldPrice: number | null;
  condition: string;
  plateNumber: string;
  taxDate: Date | null;
}

const VehicleStatus = () => {
  const { setFieldValue, values, touched, errors } =
    useFormikContext<VehicleStatusValues>();
  const contacts = useAppSelector(getContactsData);
  const [openContactForm, setOpenContactForm] = useState<boolean>(false);

  const handleOpenContactForm = useCallback(() => {
    setOpenContactForm(true);
  }, []);

  const handleCloseContactForm = useCallback(() => {
    setOpenContactForm(false);
  }, []);

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
        <Field
          as={TextField}
          name="name"
          label="Name"
          fullWidth
          size="small"
          variant="outlined"
          error={touched.name && Boolean(errors.name)}
          helperText={<ErrorMessage name="name" />}
          color="secondary"
        />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <Field as={SelectField} options={status} name="status" label="Status" />
      </Grid>
      <Grid xs={0} sm={6} md={8}></Grid>
      <Grid xs={12} sm={6}>
        <DatePicker
          onChange={(date) => setFieldValue('dateAdded', date)}
          label="Date Added"
          value={values.dateAdded}
          slotProps={{
            textField: {
              fullWidth: true,
              size: 'small',
              color: 'secondary',
              error: Boolean(touched.dateAdded && errors.dateAdded),
              helperText: <ErrorMessage name="dateAdded" component="div" />,
            },
          }}
          maxDate={new Date()}
        />
      </Grid>
      {values.status === 'Sold' && (
        <Grid xs={12} sm={6}>
          <DatePicker
            onChange={(date) => setFieldValue('dateSold', date)}
            label="Date Sold"
            value={values.dateSold}
            slotProps={{
              textField: {
                fullWidth: true,
                size: 'small',
                color: 'secondary',
                error: Boolean(touched.dateSold && errors.dateSold),
                helperText: <ErrorMessage name="dateSold" component="div" />,
              },
            }}
            maxDate={new Date()}
          />
        </Grid>
      )}
      {values.status === 'Sold' && contacts && (
        <>
          <Grid xs={12} sm={6}>
            <Autocomplete
              fullWidth
              autoHighlight
              options={contacts}
              value={
                contacts.find((contact) => contact._id === values.buyerId) ||
                null
              }
              getOptionLabel={(option) =>
                `${option.firstName}${
                  option.lastName ? ` ${option.lastName}` : ''
                }`
              }
              onChange={(_event, newValue: ContactData | null) =>
                setFieldValue('buyerId', newValue ? newValue._id : '')
              }
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderOption={(props, option) => (
                <li {...props} key={`${option._id}-autocomplete`}>
                  {option.firstName}
                  {option.lastName ? ` ${option.lastName}` : ''}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="buyerId"
                  label="Buyer"
                  size="small"
                  color="secondary"
                  error={Boolean(
                    touched.buyerId &&
                      errors.buyerId &&
                      values.status === 'Sold',
                  )}
                  helperText={<ErrorMessage name="buyerId" component="div" />}
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
              setFieldValue('price', null);
            } else {
              setFieldValue('price', values.floatValue);
            }
          }}
          value={values.price}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Price"
          color="secondary"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
          error={Boolean(touched.price && errors.price)}
          helperText={<ErrorMessage name="price" />}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NumericFormat
          onValueChange={(values) => {
            if (!values.floatValue) {
              setFieldValue('marketPrice', null);
            } else {
              setFieldValue('marketPrice', values.floatValue);
            }
          }}
          value={values.marketPrice}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Market Price"
          color="secondary"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <NumericFormat
          onValueChange={(values) => {
            if (!values.floatValue) {
              setFieldValue('purchasePrice', null);
            } else {
              setFieldValue('purchasePrice', values.floatValue);
            }
          }}
          value={values.purchasePrice}
          fullWidth
          displayType="input"
          customInput={TextField}
          size="small"
          label="Purchase Price"
          color="secondary"
          thousandSeparator="."
          decimalSeparator=","
          prefix="Rp "
        />
      </Grid>
      {values.status === 'Sold' && (
        <Grid xs={12} sm={6}>
          <NumericFormat
            onValueChange={(values) => {
              if (!values.floatValue) {
                setFieldValue('soldPrice', null);
              } else {
                setFieldValue('soldPrice', values.floatValue);
              }
            }}
            value={values.soldPrice}
            fullWidth
            displayType="input"
            customInput={TextField}
            size="small"
            label="Sold Price"
            color="secondary"
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            error={Boolean(touched.soldPrice && errors.soldPrice)}
            helperText={<ErrorMessage name="soldPrice" />}
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
          <Field
            as={SelectField}
            options={condition}
            name="condition"
            label="Condition"
          />
        </Box>
      </Grid>
      {values.condition === 'Used' && (
        <>
          <Grid xs={12} sm={6}>
            <Field
              as={TextField}
              name="plateNumber"
              label="Plate Number"
              fullWidth
              size="small"
              variant="outlined"
              color="secondary"
              error={touched.plateNumber && Boolean(errors.plateNumber)}
              helperText={<ErrorMessage name="plateNumber" />}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <DatePicker
              onChange={(date) => setFieldValue('taxDate', date)}
              label="Tax Date"
              value={values.taxDate}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  color: 'secondary',
                  error: Boolean(touched.taxDate && errors.taxDate),
                  helperText: <ErrorMessage name="taxDate" component="div" />,
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
