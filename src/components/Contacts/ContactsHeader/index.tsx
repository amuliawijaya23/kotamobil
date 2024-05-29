import type { Order } from '~/helpers';
import React from 'react';
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

import { useAppSelector } from '~/redux/store';
import { getContactsData } from '~/redux/reducers/contactsSlice';

interface ContactsHeaderProps {
  numSelected: number;
  order: Order;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRequestSort: (event: React.MouseEvent<unknown>) => void;
}

const headCells = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'email', label: 'Email' },
  { id: 'socials', label: 'Socials' },
];

const ContactsHeader = ({
  numSelected,
  order,
  handleSelectAllClick,
  handleRequestSort,
}: ContactsHeaderProps) => {
  const contacts = useAppSelector(getContactsData);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              numSelected > 0 && numSelected < (contacts?.length || 0)
            }
            checked={Boolean(
              contacts &&
                contacts.length > 0 &&
                numSelected === contacts.length,
            )}
            onChange={handleSelectAllClick}
            inputProps={{ 'aria-label': 'select all contacts' }}
          />
        </TableCell>
        <TableCell align="left" padding="none" sortDirection={order}>
          <TableSortLabel
            active={true}
            direction={order}
            onClick={handleRequestSort}
          >
            First Name
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          </TableSortLabel>
        </TableCell>
        {headCells.map((headcell) => (
          <TableCell key={headcell.id} align="left" padding="normal">
            {headcell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ContactsHeader;
