import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import NavBar from '~/components/Navigation';

interface LayoutProps {
  onLogout: () => Promise<boolean>;
}
const Layout = ({ onLogout }: LayoutProps) => {
  return (
    <>
      <Box component={Paper}>
        <Box component={'header'}>
          <NavBar onLogout={onLogout} />
        </Box>
        <Box component="main" sx={{ width: '100vw', minHeight: '100vh' }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
