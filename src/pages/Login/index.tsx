import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Button,
  Avatar,
  Typography,
  Link,
} from '@mui/material';
import React from 'react';

import EmailInput from '~/components/Authentication/EmailInput';
import PasswordInput from '~/components/Authentication/PasswordInput';

import useAuthData from '~/hooks/useAuthData';

const Login = () => {
  const {
    email,
    isValidEmail,
    password,
    handleOnChangeEmail,
    handleOnChangePassword,
    handleLogin,
  } = useAuthData();

  const handleMouseDownSubmit = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
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
            </Grid>
            <Grid xs={12}>
              <EmailInput
                value={email}
                onChangeHandler={handleOnChangeEmail}
                isValidEmail={isValidEmail}
              />
              <PasswordInput
                value={password}
                onChangeHandler={handleOnChangePassword}
              />
            </Grid>
            <Grid xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                onMouseDown={handleMouseDownSubmit}
              >
                Sign In
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button
                fullWidth
                variant="contained"
                onMouseDown={handleMouseDownSubmit}
              >
                Cancel
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
