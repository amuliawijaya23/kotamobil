import axios, { AxiosError } from 'axios';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getSelectedContacts,
  removeContacts,
} from '~/redux/reducers/contactsSlice';
import { setAlert } from '~/redux/reducers/appSlice';

const useContactData = () => {
  const dispatch = useAppDispatch();
  const selectedContacts = useAppSelector(getSelectedContacts);

  const handleOnDeleteContacts = async () => {
    try {
      if (selectedContacts.length === 0) {
        dispatch(
          setAlert({ message: 'No contacts selected', severity: 'error' }),
        );
      }

      const response = await axios.post('/api/contact/delete', {
        contactIds: selectedContacts,
      });

      if (response.status === 200) {
        dispatch(
          setAlert({
            message: 'Contacts deleted successfully',
            severity: 'success',
          }),
        );
        dispatch(removeContacts(selectedContacts));
      }
    } catch (error) {
      console.error('Failed to remove contacts:', error);

      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data.message ||
          'An error occured while deleting contacts';
        dispatch(setAlert({ message: errorMessage, severity: 'error' }));
        return;
      }
      dispatch(
        setAlert({
          message: 'An undexpected error occured, please try again',
          severity: 'error',
        }),
      );
    }
  };

  return { handleOnDeleteContacts };
};

export default useContactData;
