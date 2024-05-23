import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

interface EmailInputProps {
  value: string;
  isValidEmail: boolean;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error: string;
}

const EmailInput = ({
  value,
  isValidEmail,
  onChangeHandler,
  error,
}: EmailInputProps) => {
  return (
    <FormControl
      fullWidth
      size="small"
      variant="outlined"
      sx={{ mt: 1, mb: 1 }}
    >
      <InputLabel htmlFor="outlined-email">Email</InputLabel>
      <OutlinedInput
        type="email"
        onChange={onChangeHandler}
        value={value}
        label="Email"
        error={
          Boolean(!isValidEmail && value.length > 0) ||
          Boolean(error && !isValidEmail) ||
          Boolean(error && value.length === 0)
        }
      />
      {!isValidEmail && value.length > 0 && (
        <FormHelperText>Invalid email address</FormHelperText>
      )}
      {error && value.length === 0 && (
        <FormHelperText>Missing parameter</FormHelperText>
      )}
    </FormControl>
  );
};

export default EmailInput;
