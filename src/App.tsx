import { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loading from './components/Loading';
import PageNotFound from './pages/PageNotFound';
import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';
import UnverifiedRoute from './components/RouteProtection/UnverifiedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import VerifyUser from './pages/VerifyUser';
import ResetPassword from './pages/ResetPassword';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Contacts from './pages/Contacts';
import Vehicle from './pages/Vehicle';
import { useAppDispatch, useAppSelector } from './redux/store';
import {
  getAppStatus,
  getAppAlert,
  resetAlert,
} from './redux/reducers/appSlice';
import { initializeUser } from './redux/reducers/userSlice';

function App() {
  const status = useAppSelector(getAppStatus);
  const alert = useAppSelector(getAppAlert);
  const dispatch = useAppDispatch();

  const handleClearAlert = useCallback(() => {
    dispatch(resetAlert());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loading />
      </Box>
    );
  }

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
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <AuthenticatedRoute>
                  <Dashboard />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <AuthenticatedRoute>
                  <Inventory />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/vehicle/:id"
              element={
                <AuthenticatedRoute>
                  <Vehicle />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/contacts"
              element={
                <AuthenticatedRoute>
                  <Contacts />
                </AuthenticatedRoute>
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <UnauthenticatedRoute>
                <Login />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnauthenticatedRoute>
                <Register />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="forgot-password"
            element={
              <UnauthenticatedRoute>
                <ForgotPassword />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/verify/:userId/:verificationId"
            element={
              <UnverifiedRoute>
                <VerifyUser />
              </UnverifiedRoute>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <UnauthenticatedRoute>
                <ResetPassword />
              </UnauthenticatedRoute>
            }
          />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
