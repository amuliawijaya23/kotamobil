import type { Order } from '~/helpers';
import { useState, useMemo } from 'react';
import {
  Toolbar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

import ContactsToolbar from '~/components/Contacts/ContactsToolbar';
import ContactsHeader from '~/components/Contacts/ContactsHeader';
import ContactForm from '~/components/ContactForm';

import { useAppSelector } from '~/redux/store';
import { getContactsData } from '~/redux/reducers/contactsSlice';

import { getComparator, stableSort } from '~/helpers';

const Contacts = () => {
  const contacts = useAppSelector(getContactsData);

  const [order, setOrder] = useState<Order>('asc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>) => {
    event.preventDefault();
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = (contacts && contacts.map((n) => n._id)) || [];
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (contacts?.length || 0))
      : 0;

  const visibleRows = useMemo(() => {
    if (contacts && contacts.length > 0) {
      return stableSort(contacts, getComparator(order, 'firstName')).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
    }
  }, [order, page, rowsPerPage, contacts]);

  return (
    <>
      <Toolbar />
      <ContactForm open={openForm} handleCloseForm={handleCloseForm} />
      <Box sx={{ width: '100%', height: '100vh' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <ContactsToolbar
            handleOpenForm={handleOpenForm}
            numSelected={selected.length}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750, height: '100%' }} size="medium">
              <ContactsHeader
                numSelected={selected.length}
                order={order}
                handleRequestSort={handleRequestSort}
                handleSelectAllClick={handleSelectAllClick}
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
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
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
                          >
                            <InstagramIcon sx={{ height: 25, width: 20 }} />
                          </IconButton>
                          <IconButton size="small" disabled={!contact.facebook}>
                            <FacebookIcon sx={{ height: 25, width: 20 }} />
                          </IconButton>
                          <IconButton size="small" disabled={!contact.twitter}>
                            <XIcon sx={{ height: 25, width: 20 }} />
                          </IconButton>
                          <IconButton size="small" disabled={!contact.tiktok}>
                            <img
                              sizes="small"
                              style={{ height: 20, width: 20, opacity: 0.3 }}
                              src="./src/assets/tik-tok.png"
                            />
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={(contacts && contacts.length) || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
};

export default Contacts;
