import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';

import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Inventory from './pages/Inventory';
import PageNotFound from './pages/PageNotFound';

import useSession from './hooks/useSession';

function App() {
  useSession();

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
          <Route index element={<>Hello</>} />
          <Route
            path="/inventory"
            element={
              <AuthenticatedRoute>
                <Inventory />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/contacts"
            element={<AuthenticatedRoute>Contacts</AuthenticatedRoute>}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
