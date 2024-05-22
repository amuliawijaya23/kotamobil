import React from 'react';

interface NameInputProps {
  value: string;
  label: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

import { FormControl, InputLabel, OutlinedInput } from '@mui/material';

const NameInput = ({ value, label, onChangeHandler }: NameInputProps) => {
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
      />
    </FormControl>
  );
};

export default NameInput;
