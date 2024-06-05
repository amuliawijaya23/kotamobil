import { useState } from 'react';
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
import ContactInformation from './ContactInformation';
import ContactSocials from './ContactSocials';
import useContactForm from '~/hooks/useContactForm';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getContactFormData } from '~/redux/reducers/contactFormSlice';
import { setAlert } from '~/redux/reducers/appSlice';

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
    handleLinkedInChange,
    handleOnSave,
  } = useContactForm();
  const dispatch = useAppDispatch();
  const contactFormData = useAppSelector(getContactFormData);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleOnCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const onClose = () => {
    handleResetForm();
    onCloseForm();
  };

  const handleOnValidate = () => {
    if (
      !contactFormData.firstName ||
      !contactFormData.country ||
      contactFormData.mobile.length < 10
    ) {
      dispatch(setAlert({ message: 'Missing parameters', severity: 'error' }));
      return;
    }
    handleOnOpenConfirmation();
  };

  const onSave = async () => {
    handleOnCloseConfirmation();
    if (await handleOnSave()) {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={openConfirmation} onClose={handleOnCloseConfirmation}>
        <DialogTitle>
          {contactFormData.updateId ? 'Update Contact' : 'Create Contact'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contactFormData.updateId
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
        <Box component="form" sx={style}>
          <Grid container p={1} spacing={2}>
            <ContactInformation
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
              onLinkedInChange={handleLinkedInChange}
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
              onClick={handleOnValidate}
              onMouseDown={handleMouseDown}
              sx={{ width: 50 }}
              color="success"
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
