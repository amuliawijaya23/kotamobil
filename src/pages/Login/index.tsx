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
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  email: string;
  password: string;
  error: string;
  isValidEmail: boolean;
  onChangeEmail: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onChangePassword: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onClearError: () => void;
  onLogin: () => Promise<boolean | void>;
}

const Login = ({
  email,
  isValidEmail,
  password,
  error,
  onClearError,
  onChangeEmail,
  onChangePassword,
  onLogin,
}: LoginProps) => {
  const navigate = useNavigate();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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
                Sign In
              </Typography>
              <ErrorAlert error={error} onClearError={onClearError} />
            </Grid>
            <Grid xs={12}>
              <EmailInput
                value={email}
                onChangeHandler={onChangeEmail}
                isValidEmail={isValidEmail}
                error={error}
              />
              <PasswordInput
                value={password}
                label="Password"
                onChangeHandler={onChangePassword}
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
