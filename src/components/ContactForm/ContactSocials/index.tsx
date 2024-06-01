import {
  Unstable_Grid2 as Grid,
  Typography,
  FormControl,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

import { useAppSelector } from '~/redux/store';
import { getContactFormData } from '~/redux/reducers/formSlice';

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
  onTiktokChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

const ContactSocials = ({
  onInstagramchange,
  onFaceBookChange,
  onTwitterChange,
  onTiktokChange,
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
            onChange={onTiktokChange}
            value={contactFormData.tiktok}
            startAdornment={
              <InputAdornment position="start">
                <img
                  src="./src/assets/tik-tok.png"
                  style={{ width: 20, height: 20, opacity: 0.5 }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default ContactSocials;