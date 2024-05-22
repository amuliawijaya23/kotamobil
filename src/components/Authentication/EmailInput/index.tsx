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
}

const EmailInput = ({
  value,
  isValidEmail,
  onChangeHandler,
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
        error={!isValidEmail && value.length > 0}
      />
      {!isValidEmail && value.length > 0 && (
        <FormHelperText>Invalid email address</FormHelperText>
      )}
    </FormControl>
  );
};

export default EmailInput;
