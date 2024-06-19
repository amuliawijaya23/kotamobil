import { useCallback } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Button,
  Typography,
  TextField,
  Link,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { LoginFormSchema } from '~/helpers/formSchema';
import PasswordField from '~/components/Authentication/PasswordField';
import ErrorAlert from '~/components/Authentication/ErrorAlert';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getTheme } from '~/redux/reducers/themeSlice';
import { loginUser } from '~/redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginFormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await dispatch(loginUser(values));
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
              variant="outlined"
              bgcolor="primary.light"
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
                      ? '/src/assets/gudangmobil-logo-dark.png'
                      : '/src/assets/gudangmobil-logo-light.png'
                  }
                  alt="logo"
                  style={{ width: 150, height: 60 }}
                />
                <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                  Sign In
                </Typography>
                <ErrorAlert />
              </Grid>
              <Grid xs={12}>
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
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  Sign In
                </LoadingButton>
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
        )}
      </Formik>
    </Box>
  );
};

export default Login;
