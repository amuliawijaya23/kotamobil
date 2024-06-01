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
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  isValidEmail: boolean;
  password: string;
  confirmPassword: string;
  error: string;
  onClearError: () => void;
  onChangeFirstName: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangeLastName: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangeEmail: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangePassword: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangeConfirmPassword: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onRegister: () => Promise<boolean | void>;
}

const Register = ({
  firstName,
  lastName,
  email,
  isValidEmail,
  password,
  confirmPassword,
  error,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onRegister,
  onClearError,
}: RegisterProps) => {
  const navigate = useNavigate();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnRegister = async (
    event: React.FormEvent<EventTarget | HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      if (await onRegister()) {
        navigate('/login');
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
          <Grid container component={Paper} spacing={1} p={2}>
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
              <ErrorAlert error={error} onClearError={onClearError} />
            </Grid>
            <Grid xs={12}>
              <NameInput
                value={firstName}
                label="First Name"
                onChangeHandler={onChangeFirstName}
                error={error}
              />
              <NameInput
                value={lastName}
                label="Last Name"
                onChangeHandler={onChangeLastName}
                error={error}
              />
              <EmailInput
                value={email}
                isValidEmail={isValidEmail}
                onChangeHandler={onChangeEmail}
                error={error}
              />
              <PasswordInput
                value={password}
                label="Password"
                onChangeHandler={onChangePassword}
                error={error}
              />
              <PasswordInput
                value={confirmPassword}
                label="Confirm Password"
                onChangeHandler={onChangeConfirmPassword}
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
