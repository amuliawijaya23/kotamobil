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
import ErrorAlert from '~/components/ErrorAlert';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getFormAlert,
  getUserFormData,
  setUserFirstName,
  setUserLastName,
  setUserEmail,
  setUserPassword,
  setUserConfirmPassword,
} from '~/redux/reducers/formSlice';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onRegister: () => Promise<boolean | void>;
}

const Register = ({ onRegister }: RegisterProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userFormData = useAppSelector(getUserFormData);
  const alert = useAppSelector(getFormAlert);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setUserFirstName(event.target.value));
  };

  const handleOnChangeLastName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setUserLastName(event.target.value));
  };

  const handleOnChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setUserEmail(event.target.value));
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setUserPassword(event.target.value));
  };

  const handleOnChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setUserConfirmPassword(event.target.value));
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
              <ErrorAlert />
            </Grid>
            <Grid xs={12}>
              <NameInput
                value={userFormData.firstName}
                label="First Name"
                onChangeHandler={handleOnChangeFirstName}
                error={alert?.message}
              />
              <NameInput
                value={userFormData.lastName}
                label="Last Name"
                onChangeHandler={handleOnChangeLastName}
                error={alert?.message}
              />
              <EmailInput
                value={userFormData.email}
                isValidEmail={userFormData.isValidEmail}
                onChangeHandler={handleOnChangeEmail}
                error={alert?.message}
              />
              <PasswordInput
                value={userFormData.password}
                label="Password"
                onChangeHandler={handleOnChangePassword}
                error={alert?.message}
              />
              <PasswordInput
                value={userFormData.confirmPassword}
                label="Confirm Password"
                onChangeHandler={handleOnChangeConfirmPassword}
                error={alert?.message}
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
