import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { Box, Toolbar, Paper, Button, Typography, Avatar } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getUserData } from '~/redux/reducers/userSlice';
import { Navigate } from 'react-router-dom';
import { clearUserData } from '~/redux/reducers/userSlice';
import { setAlert } from '~/redux/reducers/appSlice';
import { resendVerificationLinkService } from '~/services/userService';

const COOKIE_NAME = import.meta.env.VITE_API_COOKIE_NAME;

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const AppCookie = Cookies.get(COOKIE_NAME);
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);

  const handleResendVerificationLink = useCallback(async () => {
    if (user) {
      try {
        const response = await resendVerificationLinkService(user._id);
        if (response.status === 200) {
          dispatch(
            setAlert({
              message: 'New verification link sent, please check your email.',
              severity: 'success',
            }),
          );
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          dispatch(
            setAlert({
              message: error.response?.data.message,
              severity: 'error',
            }),
          );
        }
      }
    }
  }, [dispatch, user]);

  if (!AppCookie) {
    dispatch(clearUserData());
    return <Navigate to="/login" />;
  }

  if (!user?.isVerified) {
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
        <Toolbar />
        <Paper
          sx={{
            bgcolor: 'primary.light',
            minWidth: 400,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Avatar
            sx={{ height: 35, width: 35, bgcolor: 'warning.dark', mb: 1 }}
          >
            <ErrorOutlineIcon color="inherit" fontSize="large" />
          </Avatar>
          <Typography variant="h6" textAlign="center">
            Email Not Verified
          </Typography>
          <Typography variant="body2" textAlign="center">
            Please verify your email address to proceed
          </Typography>
          <Button
            onClick={handleResendVerificationLink}
            sx={{ mt: 1 }}
            color="inherit"
          >
            Resend Link
          </Button>
        </Paper>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;
