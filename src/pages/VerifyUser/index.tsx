import { AxiosError } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { Box, Toolbar, Paper, Typography, Avatar, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Loading from '~/components/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  verifyUser,
  getUserStatus,
  getUserError,
} from '~/redux/reducers/userSlice';
import { setAlert } from '~/redux/reducers/appSlice';
import { resendVerificationLinkService } from '~/services/userService';

const VerifyUser = () => {
  const { userId, verificationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(getUserStatus);
  const error = useAppSelector(getUserError);

  const isVerificationChecked = useRef(false);

  const verifyEmail = useCallback(
    async (id: string) => {
      try {
        const verifyResponse = await dispatch(verifyUser(id));
        if (verifyResponse.meta.requestStatus === 'fulfilled') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(`Error verifying user: ${error}`);
      }
    },
    [dispatch, navigate],
  );

  useEffect(() => {
    if (verificationId && !isVerificationChecked.current) {
      isVerificationChecked.current = true;
      verifyEmail(verificationId);
    }
  }, [verificationId, verifyEmail]);

  const handleResendVerificationLink = useCallback(async () => {
    if (userId) {
      try {
        const response = await resendVerificationLinkService(userId);
        if (response.status === 200) {
          dispatch(
            setAlert({
              message:
                'New verification link sent, Please check your email. You can now close this page.',
              severity: 'success',
            }),
          );
        }
      } catch (error) {
        console.error(`Error sending new verification link: ${error}`);
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
  }, [userId, dispatch]);

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
        <Box sx={{ minHeight: 35, mb: 2 }}>
          {status === 'loading' && <Loading />}
          {status === 'succeeded' && (
            <Avatar sx={{ height: 35, width: 35, bgcolor: 'success.main' }}>
              <CheckCircleOutlineIcon color="inherit" fontSize="large" />
            </Avatar>
          )}
          {status === 'failed' && (
            <Avatar sx={{ height: 35, width: 35, bgcolor: 'error.main' }}>
              <ErrorOutlineIcon color="inherit" fontSize="large" />
            </Avatar>
          )}
        </Box>
        {status === 'loading' && (
          <Typography variant="h6" textAlign="center">
            Verifying Email
          </Typography>
        )}
        {status === 'succeeded' && (
          <>
            <Typography variant="h6" textAlign="center">
              Email Verified
            </Typography>
            <Typography variant="body2" textAlign="center">
              You will be redirected shortly.
            </Typography>
          </>
        )}
        {status === 'failed' && (
          <>
            <Typography variant="h6" textAlign="center">
              Verification Failed
            </Typography>
            <Typography variant="body2" textAlign="center">
              {error}
            </Typography>
            <Button
              onClick={handleResendVerificationLink}
              sx={{ mt: 1 }}
              color="inherit"
            >
              Resend Link
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default VerifyUser;
