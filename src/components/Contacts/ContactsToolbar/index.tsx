import { useState } from 'react';
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
import { setAlert } from '~/redux/reducers/appSlice';
import {
  getSelectedContacts,
  getContactsSearch,
  setSearch,
  deleteContacts,
} from '~/redux/reducers/contactsSlice';

interface ContactsToolbar {
  numSelected: number;
  onOpenForm: () => void;
}

const ContactsToolbar = ({ numSelected, onOpenForm }: ContactsToolbar) => {
  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(getSelectedContacts);
  const search = useAppSelector(getContactsSearch);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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

  const handleOnDeleteContacts = async () => {
    try {
      if (selectedContacts.length === 0) {
        dispatch(
          setAlert({ message: 'No contacts selected', severity: 'error' }),
        );
      }

      const response = await dispatch(deleteContacts(selectedContacts));
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(
          setAlert({
            message: 'Contacts deleted!',
            severity: 'success',
          }),
        );
      }

      if (response.meta.requestStatus === 'rejected') {
        if (
          response.payload &&
          typeof response.payload === 'object' &&
          'message' in response.payload
        ) {
          dispatch(
            setAlert({
              message: response.payload?.message as string,
              severity: 'error',
            }),
          );
        }
      }
    } catch (error) {
      console.error('Failed to remove contacts:', error);
    }
  };

  const onDelete = () => {
    handleOnDeleteContacts();
    handleOnCloseConfirmation();
  };

  const handleOnUpdate = () => {
    onOpenForm();
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
            variant="body1"
            fontWeight="bold"
            id="tableTitle"
            component="div"
            color="secondary"
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
              color="secondary"
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
