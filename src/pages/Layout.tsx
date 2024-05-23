import { Outlet } from 'react-router-dom';

import { Box, Paper, Container, Toolbar } from '@mui/material';

import NavBar from '~/components/Navigation/NavBar';

const Layout = () => {
  return (
    <Box component={Paper}>
      <Container component={'header'}>
        <NavBar />
      </Container>
      <Container component="main">
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
