import { useCallback } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Button,
  Typography,
  Link,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { RegisterFormSchema } from '~/helpers/formSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ErrorAlert from '~/components/Authentication/ErrorAlert';
import PasswordField from '~/components/Authentication/PasswordField';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getTheme } from '~/redux/reducers/themeSlice';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '~/redux/reducers/userSlice';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector(getTheme);

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterFormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await dispatch(registerUser(values));
          if (response.meta.requestStatus === 'fulfilled') {
            resetForm();
            setSubmitting(false);
            navigate('/dashboard');
          }
        }}
      >
        {({ isSubmitting, isValid, errors, touched }) => (
          <Box
            component={Form}
            sx={{
              width: {
                xs: '70%',
                sm: '45%',
                md: '35%',
                lg: '25%',
                xl: '15%',
              },
            }}
          >
            <Grid
              container
              component={Paper}
              bgcolor="primary.light"
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
                <img
                  src={
                    theme === 'light'
                      ? '/public/kotamobil-light.png'
                      : '/public/kotamobil-dark.png'
                  }
                  alt="logo"
                  style={{ width: 150, height: 90 }}
                />
                <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                  Sign Up
                </Typography>
                <ErrorAlert />
              </Grid>
              <Grid xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  name="firstName"
                  label="First Name"
                  type="text"
                  color="secondary"
                  error={touched.firstName && errors.firstName}
                  helperText={<ErrorMessage name="firstName" />}
                  sx={{ mb: 1 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  color="secondary"
                  error={touched.lastName && errors.lastName}
                  helperText={<ErrorMessage name="lastName" />}
                  sx={{ mb: 1 }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  size="small"
                  name="email"
                  label="Email"
                  type="email"
                  color="secondary"
                  error={touched.email && errors.email}
                  helperText={<ErrorMessage name="email" />}
                  sx={{ mb: 1 }}
                />
                <Field
                  as={PasswordField}
                  fullWidth
                  size="small"
                  name="password"
                  label="Password"
                  color="secondary"
                  sx={{ mb: 1 }}
                />
                <Field
                  as={PasswordField}
                  fullWidth
                  size="small"
                  name="confirmPassword"
                  label="Confirm Password"
                  color="secondary"
                  sx={{ mb: 1 }}
                />
              </Grid>
              <Grid xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid xs={6}>
                <LoadingButton
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="secondary"
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                >
                  Sign Up
                </LoadingButton>
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
        )}
      </Formik>
    </Box>
  );
};

export default Register;
