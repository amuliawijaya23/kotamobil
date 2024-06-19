import React, { useCallback, useEffect, useRef } from 'react';
import { checkVerification } from '~/redux/reducers/appSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '~/redux/store';
import { clearUserData } from '~/redux/reducers/userSlice';

const VerifiedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isVerificationChecked = useRef(false);

  const checkUserVerification = useCallback(async () => {
    const response = await dispatch(checkVerification());
    if (response.meta.requestStatus === 'rejected') {
      switch (response.payload) {
        case 'Unauthorized':
          dispatch(clearUserData());
          navigate('/login');
          break;
        case 'Please verify your email to proceed':
          navigate('/verify-email');
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isVerificationChecked.current) {
      isVerificationChecked.current = true;
      checkUserVerification();
    }
  }, [checkUserVerification]);

  return <>{children}</>;
};

export default VerifiedRoute;
