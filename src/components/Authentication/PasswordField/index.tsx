import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ErrorMessage, useField } from 'formik';

interface PasswordFieldProps {
  label: string;
  name: string;
}
const PasswordField: React.FC<PasswordFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <TextField
      {...field}
      {...props}
      type={showPassword ? 'text' : 'password'}
      label={label}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={Boolean(meta.touched && meta.error)}
      helperText={<ErrorMessage name={field.name} />}
    />
  );
};

export default PasswordField;
