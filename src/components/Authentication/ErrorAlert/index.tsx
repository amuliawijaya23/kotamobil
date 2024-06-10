import React, { useCallback } from 'react';
import { Collapse, Alert, IconButton } from '@mui/material';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  clearUserError,
  getUserError,
  getUserStatus,
} from '~/redux/reducers/userSlice';
import CloseIcon from '@mui/icons-material/Close';

const ErrorAlert = () => {
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(getUserStatus);
  const userError = useAppSelector(getUserError);
  const handleMouseDownClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClearError = useCallback(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  return (
    <Collapse
      in={Boolean(userStatus === 'failed')}
      sx={{ width: '100%', mt: 1, mb: 1 }}
    >
      <Alert
        severity="error"
        variant="filled"
        action={
          <IconButton
            aria-label="close alert"
            color="inherit"
            size="small"
            onClick={handleClearError}
            onMouseDown={handleMouseDownClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {userError}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;
