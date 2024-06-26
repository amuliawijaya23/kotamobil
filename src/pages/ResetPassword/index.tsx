import { useCallback } from 'react';
import {
  Box,
  Unstable_Grid2 as Grid,
  Paper,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import ErrorAlert from '~/components/Authentication/ErrorAlert';
import PasswordField from '~/components/Authentication/PasswordField';
import { useNavigate, useParams } from 'react-router-dom';
import { ResetPasswordFormSchema } from '~/helpers/formSchema';
import { LoadingButton } from '@mui/lab';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { resetPassword } from '~/redux/reducers/userSlice';
import { getTheme } from '~/redux/reducers/themeSlice';
import { setAlert } from '~/redux/reducers/appSlice';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector(getTheme);

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ResetPasswordFormSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await dispatch(
            resetPassword({
              token: token as string,
              password: values.password,
            }),
          );
          if (response.meta.requestStatus === 'fulfilled') {
            resetForm();
            navigate('/login');
            dispatch(
              setAlert({
                message: 'Password updated. Please sign in to Kota Mobil.',
                severity: 'success',
              }),
            );
          }
          if (response.meta.requestStatus === 'rejected') {
            dispatch(
              setAlert({
                message: response.payload as string,
                severity: 'error',
              }),
            );
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
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
                      ? '/public/kotamobil-light.png'
                      : '/public/kotamobil-dark.png'
                  }
                  alt="logo"
                  style={{ width: 150, height: 90 }}
                />
                <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
                  Reset Password
                </Typography>
                <ErrorAlert />
              </Grid>
              <Grid xs={12}>
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
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  Reset Password
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

export default ResetPassword;
