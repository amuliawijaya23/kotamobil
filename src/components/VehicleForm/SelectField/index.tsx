import React, { useMemo } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useField } from 'formik';

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta] = useField<string>(props);
  const errorText = useMemo(
    () => (meta.touched && meta.error ? meta.error : ''),
    [meta],
  );

  return (
    <FormControl size="small" fullWidth error={!!errorText}>
      <InputLabel id={`${field.name}-select-label`} color="secondary">
        {label}
      </InputLabel>
      <Select
        labelId={`${field.name}-select-label`}
        id={`${field.name}-select`}
        {...field}
        color="secondary"
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={`${field.name}-select-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {errorText && <FormHelperText>{String(errorText)}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
