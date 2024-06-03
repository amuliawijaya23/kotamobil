import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';
import Loading from './components/Loading';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import Inventory from './pages/Inventory';
import Vehicle from './pages/Vehicle';
import PageNotFound from './pages/PageNotFound';
import useAuthentication from './hooks/useAuthentication';
import { useAppSelector } from './redux/store';
import { getAppStatus } from './redux/reducers/appSlice';

function App() {
  const { isLoading } = useAppSelector(getAppStatus);
  const { handleLogin, handleRegister, handleLogout } = useAuthentication();

  if (isLoading) {
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
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={
              <UnauthenticatedRoute>
                <Login onLogin={handleLogin} />
              </UnauthenticatedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <UnauthenticatedRoute>
                <Register onRegister={handleRegister} />
              </UnauthenticatedRoute>
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
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
