import { Outlet } from 'react-router-dom';
import { Box, Paper, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from '~/components/Navigation';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getAppAlert, resetAlert } from '~/redux/reducers/appSlice';

interface LayoutProps {
  onLogout: () => Promise<boolean>;
}
const Layout = ({ onLogout }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(getAppAlert);

  const handleClearAlert = () => {
    dispatch(resetAlert());
  };

  return (
    <>
      <Snackbar
        open={Boolean(alert)}
        autoHideDuration={6000}
        onClose={handleClearAlert}
        action={
          <IconButton size="small" color="inherit" onClick={handleClearAlert}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClose={handleClearAlert}
          severity={alert?.severity === 'error' ? 'error' : 'success'}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <Box component={Paper}>
        <Box component={'header'}>
          <NavBar onLogout={onLogout} />
        </Box>
        <Box component="main">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
