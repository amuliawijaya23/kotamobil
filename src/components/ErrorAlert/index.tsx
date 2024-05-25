import React from 'react';
import { Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorAlertProps {
  error: string;
  handleClearError: () => void;
}

const ErrorAlert = ({ error, handleClearError }: ErrorAlertProps) => {
  const handleMouseDownClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Collapse in={Boolean(error)} sx={{ width: '100%', mt: 1, mb: 1 }}>
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
        {error}
      </Alert>
    </Collapse>
  );
};

export default ErrorAlert;
