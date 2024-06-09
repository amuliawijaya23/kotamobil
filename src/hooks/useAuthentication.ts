import { useEffect } from 'react';
import { useAppDispatch } from '~/redux/store';
import { initializeUser } from '~/redux/reducers/userSlice';

const useAuthentication = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);
};

export default useAuthentication;
