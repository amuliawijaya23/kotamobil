import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './components/RouteProtection/AuthenticatedRoute';
import UnauthenticatedRoute from './components/RouteProtection/UnauthenticatedRoute';

import Layout from './pages/Layout';
import Login from './pages/Login';
import Register from './pages/Register';

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
            path="/listings"
            element={<AuthenticatedRoute>Listings</AuthenticatedRoute>}
          />
          <Route
            path="/contacts"
            element={<AuthenticatedRoute>Contacts</AuthenticatedRoute>}
          />
        </Route>
        <Route path="*" element={<>NOT FOUND</>} />
      </Routes>
    </Router>
  );
}

export default App;
