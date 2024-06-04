import {
  Unstable_Grid2 as Grid,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

import { useAppSelector } from '~/redux/store';
import { getContactFormData } from '~/redux/reducers/contactFormSlice';

interface ContactSocialsProps {
  onInstagramchange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFaceBookChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onTwitterChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onLinkedInChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ContactSocials = ({
  onInstagramchange,
  onFaceBookChange,
  onTwitterChange,
  onLinkedInChange,
}: ContactSocialsProps) => {
  const contactFormData = useAppSelector(getContactFormData);

  return (
    <>
      <Grid xs={12}>
        <Typography
          variant="body1"
          component="p"
          fontWeight="bold"
          gutterBottom
        >
          Social Profile
        </Typography>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-instagram"
            type="text"
            placeholder="Instagram"
            onChange={onInstagramchange}
            value={contactFormData.instagram}
            startAdornment={
              <InputAdornment position="start">
                <InstagramIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-facebook"
            type="text"
            placeholder="Facebook"
            onChange={onFaceBookChange}
            value={contactFormData.facebook}
            startAdornment={
              <InputAdornment position="start">
                <FacebookIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-instagram"
            type="text"
            placeholder="X"
            onChange={onTwitterChange}
            value={contactFormData.twitter}
            startAdornment={
              <InputAdornment position="start">
                <XIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid xs={12} sm={6}>
        <FormControl fullWidth size="small" variant="outlined">
          <OutlinedInput
            id="outlined-adornment-instagram"
            type="text"
            placeholder="TikTok"
            onChange={onLinkedInChange}
            value={contactFormData.linkedIn}
            startAdornment={
              <InputAdornment position="start">
                <LinkedInIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default ContactSocials;
