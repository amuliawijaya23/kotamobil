import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;

const UnauthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const AppCookie = Cookies.get(COOKIE_NAME);

  if (AppCookie) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UnauthenticatedRoute;
