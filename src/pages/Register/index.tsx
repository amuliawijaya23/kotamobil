import { useEffect } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Button,
  Avatar,
  Typography,
  Link,
} from '@mui/material';
import NameInput from '~/components/Authentication/NameInput';
import EmailInput from '~/components/Authentication/EmailInput';
import PasswordInput from '~/components/Authentication/PasswordInput';
import ErrorAlert from '~/components/Authentication/ErrorAlert';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getAuthFormData,
  getAuthFormError,
  resetAuthForm,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  resetError,
} from '~/redux/reducers/authFormSlice';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: () => Promise<boolean | void>;
}

const Register = ({ onRegister }: RegisterProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authFormData = useAppSelector(getAuthFormData);
  const error = useAppSelector(getAuthFormError);

  useEffect(() => {
    return () => {
      dispatch(resetAuthForm());
    };
  }, [dispatch]);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClearError = () => {
    dispatch(resetError());
  };

  const handleOnChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setFirstName(event.target.value));
  };

  const handleOnChangeLastName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setLastName(event.target.value));
  };

  const handleOnChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setEmail(event.target.value));
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setPassword(event.target.value));
  };

  const handleOnChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setConfirmPassword(event.target.value));
  };

  const handleOnRegister = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      if (await onRegister()) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error while registering user', error);
    }
  };

  return (
    <Grid
      container
      component={Box}
      sx={{
        height: '100vh',
      }}
    >
      <Grid xs={12} display="flex" alignItems="center" justifyContent="center">
        <Box
          component="form"
          onSubmit={handleOnRegister}
          sx={{
            width: { xs: '70%', sm: '45%', md: '35%', lg: '25%', xl: '15%' },
          }}
        >
          <Grid
            container
            component={Paper}
            variant="outlined"
            spacing={1}
            p={2}
          >
            <Grid
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt={1}
            >
              <Avatar
                src=""
                alt="logo"
                sx={{ width: 100, height: 100, mb: 1 }}
              />
              <Typography variant="h4" component="h1">
                Sign Up
              </Typography>
              <ErrorAlert error={error} onClearError={handleClearError} />
            </Grid>
            <Grid xs={12}>
              <NameInput
                value={authFormData.firstName}
                label="First Name"
                onChangeHandler={handleOnChangeFirstName}
                error={error}
              />
              <NameInput
                value={authFormData.lastName}
                label="Last Name"
                onChangeHandler={handleOnChangeLastName}
                error={error}
              />
              <EmailInput
                value={authFormData.email}
                isValidEmail={authFormData.isValidEmail}
                onChangeHandler={handleOnChangeEmail}
                error={error}
              />
              <PasswordInput
                value={authFormData.password}
                label="Password"
                onChangeHandler={handleOnChangePassword}
                error={error}
              />
              <PasswordInput
                value={authFormData.confirmPassword}
                label="Confirm Password"
                onChangeHandler={handleOnChangeConfirmPassword}
                error={error}
              />
            </Grid>
            <Grid xs={6}>
              <Button
                fullWidth
                variant="contained"
                onMouseDown={handleMouseDown}
              >
                Cancel
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="contained" type="submit">
                Sign Up
              </Button>
            </Grid>
            <Grid xs={12} mb={1}>
              <Typography variant="subtitle1">
                Already have an account?{' '}
                <Link color="inherit" href="/login">
                  <b>Sign In</b>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
