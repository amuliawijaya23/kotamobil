import { useMemo } from 'react';
import { Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getContactsData,
  getSelectedContacts,
} from '~/redux/reducers/contactsSlice';
import {
  setContactFirstName,
  setContactLastName,
  setContactAddress,
  setContactEmail,
  setContactMobile,
  setContactFacebook,
  setContactInstagram,
  setContactTiktok,
  setContactTwitter,
  setUpdateId,
  setCountry,
} from '~/redux/reducers/formSlice';
import { countryCodes } from '~/helpers/selectData';
import useContactData from '~/hooks/useContactData';

interface ContactsToolbar {
  numSelected: number;
  onOpenForm: () => void;
}

const ContactsToolbar = ({ numSelected, onOpenForm }: ContactsToolbar) => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(getContactsData);
  const selectedContacts = useAppSelector(getSelectedContacts);

  const { handleOnDeleteContacts } = useContactData();

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
        dispatch(setContactFirstName(selectedContact.firstName));
        dispatch(setContactMobile(contactMobile));
        selectedContact.lastName &&
          dispatch(setContactLastName(selectedContact.lastName));
        selectedContact.email &&
          dispatch(setContactEmail(selectedContact.email));
        selectedContact.address &&
          dispatch(setContactAddress(selectedContact.address));
        selectedContact.instagram &&
          dispatch(setContactInstagram(selectedContact.instagram));
        selectedContact.facebook &&
          dispatch(setContactFacebook(selectedContact.facebook));
        selectedContact.twitter &&
          dispatch(setContactTwitter(selectedContact.twitter));
        selectedContact.tiktok &&
          dispatch(setContactTiktok(selectedContact.tiktok));
        dispatch(setUpdateId(selectedContact._id));
      } catch (error) {
        console.error('Error occured during form initialization:', error);
      } finally {
        onOpenForm();
      }
    }
  };

  return (
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
              onClick={handleOnDeleteContacts}
              onMouseDown={handleMouseDown}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Add Contact">
          <IconButton onClick={onOpenForm} onMouseDown={handleMouseDown}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default ContactsToolbar;
