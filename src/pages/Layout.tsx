import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '~/components/Navigation';

const Layout = () => {
  return (
    <Box>
      <Box component={'header'}>
        <NavBar />
      </Box>
      <Box component="main">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
