import {
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  Paper,
  Box,
  Button,
  ImageList,
  ImageListItem,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useDropzone } from 'react-dropzone';

interface VehicleImagesProps {
  images: File[] | undefined | null;
  onDrop: (acceptedFiles: File[] | undefined) => void;
}

const VehicleImages = ({ images, onDrop }: VehicleImagesProps) => {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <>
      <Grid xs={12}>
        <Typography
          gutterBottom
          variant="body1"
          component="p"
          fontWeight="bold"
        >
          Vehicle Images
        </Typography>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <ImageList cols={3}>
          {images &&
            images.map((image, index) => (
              <ImageListItem key={`image-upload-${index}`}>
                <img
                  loading="lazy"
                  alt={`image-upload-${index}`}
                  srcSet={`${URL.createObjectURL(image)}`}
                  src={`${URL.createObjectURL(image)}`}
                />
              </ImageListItem>
            ))}
          {!images && (
            <ImageListItem key={`image-placeholder`}>
              <img
                loading="lazy"
                alt="img-placeholder"
                srcSet={`./src/assets/placeholder-image.png`}
                src={'./src/assets/placeholder-image.png'}
              />
            </ImageListItem>
          )}
        </ImageList>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="subtitle2"
          textAlign="center"
          component="p"
          sx={{ mb: 1 }}
        >
          You can upload 10 images up to 10mb each.
        </Typography>
        <Paper
          {...getRootProps()}
          sx={{
            height: 100,
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'dashed',
            p: 1,
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <CloudUploadIcon sx={{ width: 25, height: 25 }} />
          ) : (
            <>
              <Typography variant="subtitle2" component="p" textAlign="center">
                Drag photo here
                <br />
                - or -
                <br />
              </Typography>
              <Button
                size="small"
                component="label"
                tabIndex={-1}
                variant="outlined"
                onClick={open}
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 0.5 }}
              >
                {'Upload files'}
              </Button>
            </>
          )}
        </Paper>
        <Box
          sx={{
            display: { xs: 'flex', lg: 'none' },
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            size="small"
            component="label"
            tabIndex={-1}
            variant="outlined"
            onClick={open}
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 0.5 }}
          >
            {'Upload files'}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default VehicleImages;
