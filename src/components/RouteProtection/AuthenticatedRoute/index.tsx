import Cookies from 'js-cookie';
import { useAppDispatch } from '~/redux/store';
import { Navigate } from 'react-router-dom';
import { clearUserData } from '~/redux/reducers/userSlice';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const AppCookie = Cookies.get(COOKIE_NAME);
  const dispatch = useAppDispatch();

  if (!AppCookie) {
    dispatch(clearUserData());
    return <Navigate to="/login" />;
  }
  return children;
};

export default AuthenticatedRoute;
