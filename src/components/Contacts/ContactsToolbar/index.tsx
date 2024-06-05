import { useMemo, useState } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getContactsData,
  getSelectedContacts,
  getContactsSearch,
  setSearch,
} from '~/redux/reducers/contactsSlice';
import {
  setFirstName,
  setLastName,
  setAddress,
  setEmail,
  setMobile,
  setFacebook,
  setInstagram,
  setLinkedIn,
  setTwitter,
  setUpdateId,
  setCountry,
} from '~/redux/reducers/contactFormSlice';
import { countryCodes } from '~/helpers/selectData';
import useContactData from '~/hooks/useContactData';

interface ContactsToolbar {
  numSelected: number;
  onOpenForm: () => void;
}

const ContactsToolbar = ({ numSelected, onOpenForm }: ContactsToolbar) => {
  const { handleOnDeleteContacts } = useContactData();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(getContactsData);
  const selectedContacts = useAppSelector(getSelectedContacts);
  const search = useAppSelector(getContactsSearch);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const selectedContact = useMemo(() => {
    if (selectedContacts.length === 1) {
      const selected = contacts?.find(
        (contact) => contact._id === selectedContacts[0],
      );
      return selected;
    }
    return;
  }, [contacts, selectedContacts]);

  const handleOnChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setSearch(event.target.value));
  };

  const handleOnCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleOnOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const onDelete = () => {
    handleOnDeleteContacts();
    handleOnCloseConfirmation();
  };

  const handleOnUpdate = () => {
    if (selectedContact) {
      try {
        const contactCountryPhone = selectedContact.mobile
          .split(' ')[0]
          .substring(1);
        const contactMobile = selectedContact.mobile.split(' ')[1];
        const country = countryCodes.find(
          (c) => c.phone === contactCountryPhone,
        );
        country && dispatch(setCountry(country));
        dispatch(setFirstName(selectedContact.firstName));
        dispatch(setMobile(contactMobile));
        selectedContact.lastName &&
          dispatch(setLastName(selectedContact.lastName));
        selectedContact.email && dispatch(setEmail(selectedContact.email));
        selectedContact.address &&
          dispatch(setAddress(selectedContact.address));
        selectedContact.instagram &&
          dispatch(setInstagram(selectedContact.instagram));
        selectedContact.facebook &&
          dispatch(setFacebook(selectedContact.facebook));
        selectedContact.twitter &&
          dispatch(setTwitter(selectedContact.twitter));
        selectedContact.linkedIn &&
          dispatch(setLinkedIn(selectedContact.linkedIn));
        dispatch(setUpdateId(selectedContact._id));
      } catch (error) {
        console.error('Error occured during form initialization:', error);
      } finally {
        onOpenForm();
      }
    }
  };

  return (
    <>
      <Dialog open={openConfirmation} onClose={handleOnCloseConfirmation}>
        <DialogTitle>Delete Contacts</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove contacts?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnCloseConfirmation} color="error">
            Cancel
          </Button>
          <Button
            onClick={onDelete}
            onMouseDown={handleMouseDown}
            color="success"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 2 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity,
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Contacts
          </Typography>
        )}

        {numSelected > 0 ? (
          <>
            {numSelected === 1 && (
              <Tooltip title="Update">
                <IconButton
                  onClick={handleOnUpdate}
                  onMouseDown={handleMouseDown}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton
                onClick={handleOnOpenConfirmation}
                onMouseDown={handleMouseDown}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={handleOnChangeSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Tooltip title="Add Contact">
              <IconButton onClick={onOpenForm} onMouseDown={handleMouseDown}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </>
  );
};

export default ContactsToolbar;
