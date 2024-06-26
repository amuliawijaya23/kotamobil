import type { ContactFormValues } from '..';
import {
  Unstable_Grid2 as Grid,
  Typography,
  InputAdornment,
  TextField,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useFormikContext, Field, ErrorMessage } from 'formik';

const ContactSocials = () => {
  const { touched, errors } = useFormikContext<ContactFormValues>();

  return (
    <>
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="p"
          fontWeight="bold"
          color="secondary"
          gutterBottom
        >
          Social Profile
        </Typography>
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="instagram"
          placeholder="Instagram"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.instagram && Boolean(errors.instagram)}
          helperText={<ErrorMessage name="instagram" />}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="facebook"
          placeholder="Facebook"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.facebook && Boolean(errors.facebook)}
          helperText={<ErrorMessage name="facebook" />}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FacebookIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="twitter"
          placeholder="twitter"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.twitter && Boolean(errors.twitter)}
          helperText={<ErrorMessage name="twitter" />}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <XIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Field
          as={TextField}
          name="linkedIn"
          placeholder="LinkedIn"
          fullWidth
          size="small"
          variant="outlined"
          color="secondary"
          error={touched.linkedIn && Boolean(errors.linkedIn)}
          helperText={<ErrorMessage name="linkedIn" />}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LinkedInIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default ContactSocials;
