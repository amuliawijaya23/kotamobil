import { Navigate } from 'react-router-dom';
import { useAppSelector } from '~/redux/store';
import { getUserData } from '~/redux/reducers/userSlice';

const UnverifiedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(getUserData);

  if (user && user.isVerified) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default UnverifiedRoute;
