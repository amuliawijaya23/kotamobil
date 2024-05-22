import React from 'react';

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

import useAuthData from '~/hooks/useAuthData';

const Register = () => {
  const {
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
  } = useAuthData();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                Sign Up
              </Typography>
              <ErrorAlert error={error} handleClearError={handleClearError} />
            </Grid>
            <Grid xs={12}>
              <NameInput
                value={firstName}
                label="First Name"
                onChangeHandler={handleOnChangeFirstName}
              />
              <NameInput
                value={lastName}
                label="Last Name"
                onChangeHandler={handleOnChangeLastName}
              />
              <EmailInput
                value={email}
                isValidEmail={isValidEmail}
                onChangeHandler={handleOnChangeEmail}
              />
              <PasswordInput
                value={password}
                label="Password"
                onChangeHandler={handleOnChangePassword}
              />
              <PasswordInput
                value={confirmPassword}
                label="Confirm Password"
                onChangeHandler={handleOnChangeConfirmPassword}
              />
            </Grid>
            <Grid xs={6}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => {}}
                onMouseDown={handleMouseDown}
              >
                Sign Up
              </Button>
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
