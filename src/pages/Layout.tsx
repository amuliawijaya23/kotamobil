import { Outlet } from 'react-router-dom';

import { Box, Paper, Toolbar } from '@mui/material';

import NavBar from '~/components/Navigation';

const Layout = () => {
  return (
    <Box component={Paper}>
      <Box component={'header'}>
        <NavBar />
      </Box>
      <Box component="main" sx={{ width: '100vw', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
