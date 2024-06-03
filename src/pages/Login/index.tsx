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
import EmailInput from '~/components/Authentication/EmailInput';
import PasswordInput from '~/components/Authentication/PasswordInput';
import ErrorAlert from '~/components/ErrorAlert';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getAuthFormData,
  getAuthFormError,
  setEmail,
  setPassword,
  resetAuthForm,
  resetError,
} from '~/redux/reducers/authFormSlice';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => Promise<boolean | void>;
}

const Login = ({ onLogin }: LoginProps) => {
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

  const handleOnLogin = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      if (await onLogin()) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Error occured while logging in', error);
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
          onSubmit={handleOnLogin}
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
                Sign In
              </Typography>
              <ErrorAlert error={error} onClearError={handleClearError} />
            </Grid>
            <Grid xs={12}>
              <EmailInput
                value={authFormData.email}
                onChangeHandler={handleOnChangeEmail}
                isValidEmail={authFormData.isValidEmail}
                error={error}
              />
              <PasswordInput
                value={authFormData.password}
                label="Password"
                onChangeHandler={handleOnChangePassword}
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
                Sign In
              </Button>
            </Grid>
            <Grid xs={12} mb={1}>
              <Typography variant="subtitle1">
                Not a member?{' '}
                <Link color="inherit" href="/register">
                  <b>Sign Up</b>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
