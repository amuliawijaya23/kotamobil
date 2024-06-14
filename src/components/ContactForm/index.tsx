import {
  addContact,
  updateContact,
  type ContactData,
} from '~/redux/reducers/contactsSlice';
import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Modal,
  Box,
  Unstable_Grid2 as Grid,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import ContactInformation from './ContactInformation';
import ContactSocials from './ContactSocials';
import { FormikProvider, useFormik, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '~/redux/store';
import { setAlert } from '~/redux/reducers/appSlice';

export interface ContactFormValues {
  firstName: string;
  lastName?: string;
  country: string;
  mobile: string;
  email?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  linkedIn?: string;
  twitter?: string;
}

interface ContactFormProps {
  contact?: ContactData;
  open: boolean;
  onCloseForm: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 600 },
  bgcolor: 'primary.light',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().optional(),
  country: Yup.string().required('Required'),
  mobile: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').optional(),
  address: Yup.string().optional(),
  instagram: Yup.string().url('Invalid Url').optional(),
  facebook: Yup.string().url('Invalid Url').optional(),
  linkedIn: Yup.string().url('Invalid Url').optional(),
  twitter: Yup.string().url('Invalid Url').optional(),
  updateId: Yup.string().url('Invalid Url').optional(),
});

const initialValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  country: '',
  mobile: '',
  email: '',
  address: '',
  instagram: '',
  facebook: '',
  linkedIn: '',
  twitter: '',
};

const ContactForm = ({ contact, open, onCloseForm }: ContactFormProps) => {
  const dispatch = useAppDispatch();
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const countryPhone = useMemo(() => {
    if (contact) {
      const contactCountryPhone = contact.mobile.split(' ')[0].substring(1);
      return contactCountryPhone;
    }
  }, [contact]);

  const contactMobile = useMemo(() => {
    if (contact) {
      return contact.mobile.split(' ')[1];
    }
  }, [contact]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { country, mobile, ...data } = values;
        const formData = { ...data, mobile: `+${country} ${mobile}` };

        const response = contact
          ? await dispatch(updateContact({ id: contact._id, formData }))
          : await dispatch(addContact(formData));

        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(
            setAlert({
              message: contact ? 'Contact Updated!' : 'Contact Created!',
              severity: 'success',
            }),
          );
          formik.resetForm();
          onCloseForm();
        }

        if (response.meta.requestStatus === 'rejected') {
          dispatch(
            setAlert({
              message: response.payload as string,
              severity: 'error',
            }),
          );
        }
      } catch (error) {
        console.error(`Error saving contact: ${error}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    setValues,
    resetForm,
    handleSubmit,
    validateForm,
    setTouched,
    touched,
    isSubmitting,
  } = formik;

  const initializeForm = useCallback(() => {
    if (contact) {
      setValues({
        firstName: contact.firstName,
        lastName: contact.lastName,
        country: countryPhone || '',
        mobile: contactMobile || '',
        email: contact.email,
        address: contact.address,
        instagram: contact.instagram,
        facebook: contact.facebook,
        linkedIn: contact.linkedIn,
        twitter: contact.twitter,
      });
    }

    return () => {
      resetForm();
    };
  }, [contact, countryPhone, contactMobile, setValues, resetForm]);

  useEffect(initializeForm, [initializeForm]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleOnOpenConfirmation = useCallback(() => {
    setOpenConfirmation(true);
  }, []);

  const handleOnCloseConfirmation = useCallback(() => {
    setOpenConfirmation(false);
  }, []);

  const onClose = useCallback(() => {
    resetForm();
    onCloseForm();
  }, [resetForm, onCloseForm]);

  const handleOnValidate = useCallback(async () => {
    const isValid = await validateForm();
    if (Object.keys(isValid).length > 0) {
      const touchedFields: { [key: string]: boolean } = {};
      Object.keys(initialValues).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched({ ...touched, ...touchedFields });
      dispatch(setAlert({ message: 'Missing parameters', severity: 'error' }));
      return;
    }
    handleOnOpenConfirmation();
  }, [touched, setTouched, dispatch, validateForm, handleOnOpenConfirmation]);

  const onSave = useCallback(async () => {
    handleOnCloseConfirmation();
    handleSubmit();
  }, [handleOnCloseConfirmation, handleSubmit]);

  return (
    <>
      <Dialog open={openConfirmation} onClose={handleOnCloseConfirmation}>
        <DialogTitle>
          {contact ? 'Update Contact' : 'Create Contact'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contact
              ? 'Are you sure you want to update this contact?'
              : 'Are you sure you want to create this contact?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnCloseConfirmation} color="error">
            Cancel
          </Button>
          <Button onClick={onSave} onMouseDown={handleMouseDown} color="info">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-contact-form"
        aria-describedby="modal-add-contact"
      >
        <FormikProvider value={formik}>
          <Box component={Form} sx={style}>
            <Grid container p={1} spacing={2}>
              <ContactInformation />
              <Grid xs={12}>
                <Divider />
              </Grid>
              <ContactSocials />
            </Grid>
            <Grid xs={12} mt={2} display="flex" justifyContent="end">
              <Button
                onClick={onClose}
                onMouseDown={handleMouseDown}
                sx={{ width: 50, mr: 1 }}
                color="error"
              >
                Cancel
              </Button>
              <LoadingButton
                loading={isSubmitting}
                onClick={handleOnValidate}
                onMouseDown={handleMouseDown}
                sx={{ width: 50 }}
                color="success"
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </Grid>
          </Box>
        </FormikProvider>
      </Modal>
    </>
  );
};

export default ContactForm;
