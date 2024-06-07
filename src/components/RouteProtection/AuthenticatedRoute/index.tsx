import Cookies from 'js-cookie';

import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/store';
import { logout } from '~/redux/reducers/userSlice';
import { setAuthenticated } from '~/redux/reducers/appSlice';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  if (!Cookies.get(COOKIE_NAME)) {
    dispatch(setAuthenticated(false));
    dispatch(logout());
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthenticatedRoute;
