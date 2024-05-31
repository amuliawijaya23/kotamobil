import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
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

  const handleClearError = () => {
    setError('');
  };

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

  const handleRegister = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>,
  ) => {
    try {
      event.preventDefault();
      if (!firstName || !email || !password || !confirmPassword) {
        return setError('Missing parameter');
      }

      if (!isValidEmail) {
        return setError('Invalid email address');
      }

      if (password !== confirmPassword) {
        return setError('Passwords do not match');
      }

      const response = await axios.post('/api/auth/register', {
        firstName: `${firstName[0].toUpperCase()}${
          firstName.substring(1).toLowerCase
        }`,
        lastName: lastName
          ? `${lastName[0].toUpperCase()}${lastName.substring(1).toLowerCase()}`
          : '',
        email,
        password,
      });

      if (response.status !== 200) {
        return setError(response.data.message);
      }

      dispatch(login(response.data));
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        return setError(error?.response?.data?.message);
      }
    }
  };

  const handleLogin = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>,
  ) => {
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
        setError(response.data.message);
        return;
      }

      const userData = { ...response.data.user };
      delete userData.password;

      dispatch(login(userData));
      navigate('/', { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        return setError(error?.response?.data?.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('/api/auth/logout');
      dispatch(logout());
      return navigate('/login', { replace: true });
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
    handleClearError,
    handleOnChangeFirstName,
    handleOnChangeLastName,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleOnChangeConfirmPassword,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuthData;
