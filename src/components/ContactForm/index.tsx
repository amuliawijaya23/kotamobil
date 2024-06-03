import {
  Modal,
  Box,
  Unstable_Grid2 as Grid,
  Divider,
  Button,
} from '@mui/material';
import ContactInformation from './ContactInformation';
import ContactSocials from './ContactSocials';
import useContactForm from '~/hooks/useContactForm';

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
    handleTiktokChange,
    handleOnSave,
  } = useContactForm();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onClose = () => {
    handleResetForm();
    onCloseForm();
  };

  const onSave = async () => {
    if (await handleOnSave()) {
      onClose();
    }
  };

  return (
    <>
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
