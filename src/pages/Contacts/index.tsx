import React from 'react';

import { Toolbar, Unstable_Grid2 as Grid, Box } from '@mui/material';

import { useAppSelector } from '~/redux/store';
import { getContactsData } from '~/redux/reducers/contactsSlice';

const Contacts = () => {
  const contacts = useAppSelector(getContactsData);

  console.log('contacts: ', contacts);

  // const data = {
  //   email: 'emily.johnson@gmail.com',
  //   firstName: 'Emily',
  //   lastName: 'Johnson',
  //   mobile: '+628170032456',
  //   ownerId: '664e2a93b5eeebf38e2b8439',
  //   _id: '66561b7542857a952928c9d0',
  // };

  return (
    <>
      <Toolbar />
      <Grid container>
        <Grid xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Contacts;
