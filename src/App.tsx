import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';
import Loading from './components/Loading';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Contacts from './pages/Contacts';
import Vehicle from './pages/Vehicle';
import VerifyUser from './pages/VerifyUser';
import PageNotFound from './pages/PageNotFound';
import { useAppDispatch, useAppSelector } from './redux/store';
import { getAppStatus } from './redux/reducers/appSlice';
import { initializeUser } from './redux/reducers/userSlice';

function App() {
  const status = useAppSelector(getAppStatus);
  const dispatch = useAppDispatch();

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
    <Router>
      <Routes>
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
          <Route
            path="/verify/:userId/:verificationId"
            element={<VerifyUser />}
          />
        </Route>
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
