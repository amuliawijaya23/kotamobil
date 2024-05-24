import Cookies from 'js-cookie';

import { Navigate } from 'react-router-dom';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!Cookies.get(COOKIE_NAME)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthenticatedRoute;