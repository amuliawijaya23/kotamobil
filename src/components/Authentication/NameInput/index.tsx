import React from 'react';

interface NameInputProps {
  value: string;
  label: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error: string | undefined;
}

import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const NameInput = ({
  value,
  label,
  onChangeHandler,
  error,
}: NameInputProps) => {
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      sx={{ mt: 1, mb: 1 }}
    >
      <InputLabel htmlFor="outlined-email">{label}</InputLabel>
      <OutlinedInput
        type="text"
        onChange={onChangeHandler}
        value={value}
        label={label}
        error={Boolean(error && label === 'First Name' && value.length === 0)}
      />
      {error && label === 'First Name' && value.length === 0 && (
        <FormHelperText>Missing Parameter</FormHelperText>
      )}
    </FormControl>
  );
};

export default NameInput;
