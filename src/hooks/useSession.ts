import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useAppDispatch } from '~/redux/store';

import { login, logout } from '~/redux/reducers/userSlice';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;
const LC_USER_DATA = 'LC_USER_DATA';

const useSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      dispatch(login(JSON.parse(localStorage.getItem(LC_USER_DATA) || '{}')));
    }

    return () => {
      // dispatch(logout());
      // Cookies.remove(COOKIE_NAME);
    };
  }, [dispatch]);
};

export default useSession;
