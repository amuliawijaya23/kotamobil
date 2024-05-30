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
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (event: React.MouseEvent<unknown>) => void;
}

const headCells = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'email', label: 'Email' },
  { id: 'address', label: 'Address' },
  { id: 'socials', label: 'Socials' },
];

const ContactsHeader = ({
  numSelected,
  order,
  onSelectAllClick,
  onRequestSort,
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
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all contacts' }}
          />
        </TableCell>
        <TableCell align="left" padding="none" sortDirection={order}>
          <TableSortLabel
            active={true}
            direction={order}
            onClick={onRequestSort}
          >
            First Name
            <Box component="span" sx={visuallyHidden}>
              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          </TableSortLabel>
        </TableCell>
        {headCells.map((headcell, index) => (
          <TableCell
            key={headcell.id}
            align={index === headCells.length - 1 ? 'right' : 'left'}
            padding="normal"
          >
            {headcell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ContactsHeader;
