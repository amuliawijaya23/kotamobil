import { useCallback, useEffect } from 'react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getSession } from '~/redux/reducers/userSlice';
import { resetContacts, setContactsData } from '~/redux/reducers/contactsSlice';

const useContactsData = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(getSession);

  const getUserContacts = useCallback(async () => {
    try {
      if (session.isAuthenticated) {
        const response = await axios.get('/api/contact');

        if (response.status === 200 && response.data.length > 0) {
          dispatch(setContactsData(response.data));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, session.isAuthenticated]);

  useEffect(() => {
    getUserContacts();

    return () => {
      dispatch(resetContacts());
    };
  }, [dispatch, getUserContacts]);

  return {};
};

export default useContactsData;
