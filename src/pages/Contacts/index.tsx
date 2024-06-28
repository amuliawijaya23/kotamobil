import type { Order } from '~/helpers';
import { useState, useMemo, useCallback } from 'react';
import {
  Toolbar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactsToolbar from '~/components/Contacts/ContactsToolbar';
import ContactsHeader from '~/components/Contacts/ContactsHeader';
import ContactForm from '~/components/ContactForm';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getContactsData,
  getSelectedContacts,
  setSelectedContacts,
  setSelectAllContacts,
  getContactsStatus,
  getAssociatedBuyerIds,
  getAssociatedVehicleIds,
  resetError,
} from '~/redux/reducers/contactsSlice';

import { getComparator, stableSort } from '~/helpers';
import { getInventory } from '~/redux/reducers/inventorySlice';

const Contacts = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(getContactsData);
  const inventory = useAppSelector(getInventory);
  const selectedContacts = useAppSelector(getSelectedContacts);
  const status = useAppSelector(getContactsStatus);
  const associatedBuyerIds = useAppSelector(getAssociatedBuyerIds);
  const associatedVehicleIds = useAppSelector(getAssociatedVehicleIds);
  const [order, setOrder] = useState<Order>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);

  const selectedContact = useMemo(() => {
    if (selectedContacts.length === 1) {
      const selected = contacts?.find(
        (contact) => contact._id === selectedContacts[0],
      );
      return selected;
    }
    return;
  }, [contacts, selectedContacts]);

  const emptyRows = useMemo(
    () =>
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - (contacts?.length || 0))
        : 0,
    [page, rowsPerPage, contacts?.length],
  );

  const visibleRows = useMemo(() => {
    if (contacts && contacts.length > 0) {
      return stableSort(contacts, getComparator(order, 'firstName')).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    }
  }, [order, page, rowsPerPage, contacts]);

  const associatedVehicles = useMemo(
    () =>
      inventory?.filter((vehicle) =>
        associatedVehicleIds?.includes(vehicle._id),
      ),
    [associatedVehicleIds, inventory],
  );

  const associatedBuyers = useMemo(
    () => contacts?.filter((buyer) => associatedBuyerIds?.includes(buyer._id)),
    [associatedBuyerIds, contacts],
  );

  const isErrorOpen = useMemo(() => {
    return Boolean(
      status === 'failed' && associatedBuyerIds && associatedVehicleIds,
    );
  }, [status, associatedBuyerIds, associatedVehicleIds]);

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setOpenForm(false);
  }, []);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>) => {
      event.preventDefault();
      const isAsc = order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
    },
    [order],
  );

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = (contacts && contacts.map((n) => n._id)) || [];
        dispatch(setSelectAllContacts(newSelected));
        return;
      }
      dispatch(setSelectAllContacts([]));
    },
    [dispatch, contacts],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<unknown>, id: string) => {
      event.preventDefault();
      dispatch(setSelectedContacts(id));
    },
    [dispatch],
  );

  const isSelected = useCallback(
    (id: string) => selectedContacts.indexOf(id) !== -1,
    [selectedContacts],
  );

  const handleCloseError = useCallback(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <>
      <Dialog open={isErrorOpen} onClose={handleCloseError}>
        <DialogTitle>
          <Typography variant="body1" fontWeight="bold" color="error">
            Delete Contacts Failed
          </Typography>
          <Typography variant="body2">
            We encountered an issue while trying to delete the selected
            contacts. Before proceeding, please ensure the following vehicles
            are updated accordingly:
          </Typography>
        </DialogTitle>
        <DialogContent>
          {associatedBuyers?.map((buyer) => {
            const vehicles = associatedVehicles?.filter(
              (v) => v.buyerId === buyer._id,
            );

            return (
              <DialogContentText
                component="div"
                key={`associated-buyer-${buyer._id}`}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="error"
                  sx={{ mt: 2 }}
                >
                  {`${buyer.firstName}`}
                  {`${buyer.lastName ? ` ${buyer.lastName}` : ''}:`}
                </Typography>
                <List disablePadding>
                  {vehicles?.map((v) => (
                    <ListItemButton
                      key={`associated-vehicles-${v._id}`}
                      dense
                      LinkComponent={'a'}
                      href={`vehicle/${v._id}`}
                    >
                      <ListItemText
                        primaryTypographyProps={{ variant: 'caption' }}
                        primary={v.name}
                        role="link"
                      />
                    </ListItemButton>
                  ))}
                </List>
              </DialogContentText>
            );
          })}
        </DialogContent>
      </Dialog>
      <Toolbar />
      <ContactForm
        open={openForm}
        contact={selectedContact}
        onCloseForm={handleCloseForm}
      />
      <Box>
        <ContactsToolbar
          onOpenForm={handleOpenForm}
          numSelected={selectedContacts.length}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <ContactsHeader
              numSelected={selectedContacts.length}
              order={order}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {visibleRows &&
                visibleRows.map((contact, index) => {
                  const isItemSelected = isSelected(contact._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, contact._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={contact._id}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {contact.firstName}
                      </TableCell>
                      <TableCell align="left">
                        {contact.lastName ? contact.lastName : '-'}
                      </TableCell>
                      <TableCell align="left">{contact.mobile}</TableCell>
                      <TableCell align="left">
                        {contact.email ? contact.email : '-'}
                      </TableCell>
                      <TableCell align="left">
                        {contact.address ? contact.address : '-'}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          disabled={!contact.instagram}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <InstagramIcon sx={{ height: 25, width: 20 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={!contact.facebook}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FacebookIcon sx={{ height: 25, width: 20 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={!contact.twitter}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <XIcon sx={{ height: 25, width: 20 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          disabled={!contact.linkedIn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LinkedInIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {(!contacts || contacts.length === 0) && (
          <Box
            sx={{
              width: '100%',
              minHeight: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
          >
            <Typography variant="h6" component="p" textAlign="center">
              No contact found. Try changing your search or add a new contact
            </Typography>
          </Box>
        )}
        {contacts && contacts.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={(contacts && contacts.length) || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </>
  );
};

export default Contacts;
