import React from 'react';
import { Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getFormAlert, resetAlert } from '~/redux/reducers/formSlice';

const ErrorAlert = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector(getFormAlert);

  const handleMouseDownClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClearError = () => {
    dispatch(resetAlert());
  };

  return (
    <Collapse in={Boolean(alert?.message)} sx={{ width: '100%', mt: 1, mb: 1 }}>
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
        {alert?.message}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;
