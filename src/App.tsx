import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacts from './pages/Contacts';
import Inventory from './pages/Inventory';
import Vehicle from './pages/Vehicle';
import PageNotFound from './pages/PageNotFound';

import useSession from './hooks/useSession';
import useInventoryData from './hooks/useInventoryData';
import useContactsData from './hooks/useContactsData';

function App() {
  useSession();
  useInventoryData();
  useContactsData();

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
