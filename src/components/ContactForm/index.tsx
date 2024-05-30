import {
  Modal,
  Box,
  Unstable_Grid2 as Grid,
  Divider,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import ContactInformation from './ContactInformation';
import ContactSocials from './ContactSocials';

import useContactForm from '~/hooks/useContactForm';

import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getFormAlert, resetAlert, setAlert } from '~/redux/reducers/formSlice';

interface ContactFormProps {
  open: boolean;
  onCloseForm: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 600 },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ContactForm = ({ open, onCloseForm }: ContactFormProps) => {
  const {
    isValidEmail,
    country,
    handleResetForm,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    handleCountryChange,
    handleMobileChange,
    handleAddressChange,
    handleInstagramChange,
    handleFacebookchange,
    handleTwitterChange,
    handleTiktokChange,
    handleOnSave,
  } = useContactForm();

  const dispatch = useAppDispatch();

  const alert = useAppSelector(getFormAlert);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClearAlert = () => {
    dispatch(resetAlert());
  };

  const onClose = () => {
    handleResetForm();
    onCloseForm();
  };

  const onSave = async () => {
    await handleOnSave();
    // if (await handleOnSave()) {
    //   dispatch(
    //     setAlert({ message: 'New Contact Created!', severity: 'success' }),
    //   );
    //   onClose();
    // }
  };

  return (
    <>
      <Snackbar
        open={Boolean(alert)}
        autoHideDuration={6000}
        onClose={handleClearAlert}
        action={
          <IconButton size="small" color="inherit" onClick={handleClearAlert}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClearAlert}
          severity={alert?.severity === 'error' ? 'error' : 'success'}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-contact-form"
        aria-describedby="modal-add-contact"
      >
        <Box component="form" sx={style}>
          <Grid container p={1} spacing={2}>
            <ContactInformation
              isValidEmail={isValidEmail}
              country={country}
              onFirstNameChange={handleFirstNameChange}
              onLastNameChange={handleLastNameChange}
              onEmailChange={handleEmailChange}
              onCountryChange={handleCountryChange}
              onMobileChange={handleMobileChange}
              onAddressChange={handleAddressChange}
            />
            <Grid xs={12}>
              <Divider />
            </Grid>
            <ContactSocials
              onInstagramchange={handleInstagramChange}
              onFaceBookChange={handleFacebookchange}
              onTwitterChange={handleTwitterChange}
              onTiktokChange={handleTiktokChange}
            />
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
            <Button
              onClick={onSave}
              onMouseDown={handleMouseDown}
              sx={{ width: 50 }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ContactForm;
