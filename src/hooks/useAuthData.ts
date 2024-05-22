import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '~/redux/store';
import { login, logout } from '~/redux/reducers/userSlice';

import { validateEmail } from '~/helpers';

const useAuthData = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFirstName(event.target.value);
  };

  const handleOnChangeLastName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLastName(event.target.value);
  };

  const handleOnChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEmail(event.target.value);
    setIsValidEmail(validateEmail(event.target.value));
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(event.target.value);
  };

  const handleOnChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault();
      if (!email || !password) {
        return setError('Missing parameter');
      }

      if (!isValidEmail) {
        return setError('Invalid email address');
      }

      const response = await axios.post('/api/auth/login', { email, password });

      if (response.status !== 200) {
        return setError(response.data.message);
      }

      dispatch(login(response.data.user));
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('/api/auth/logout');

      dispatch(logout());
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    firstName,
    lastName,
    email,
    isValidEmail,
    password,
    confirmPassword,
    error,
    handleOnChangeFirstName,
    handleOnChangeLastName,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOnChangeConfirmPassword,
    handleLogin,
    handleLogout,
  };
};

export default useAuthData;
