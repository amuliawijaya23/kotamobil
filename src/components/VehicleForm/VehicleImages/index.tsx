import { useCallback, useMemo } from 'react';
import {
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  Paper,
  Box,
  Button,
  ImageList,
  ImageListItem,
  IconButton,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormikContext } from 'formik';
import { useAppDispatch } from '~/redux/store';
import { setAlert } from '~/redux/reducers/appSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';

interface VehicleImagesProps {
  currentImages: { key: string; url: string }[] | null;
  onRemoveCurrentImages: (index: number) => void;
}
interface VehicleFormValues {
  images: File[];
  // Add other form fields as necessary
}

const VehicleImages = ({
  currentImages,
  onRemoveCurrentImages,
}: VehicleImagesProps) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { setFieldValue, values } = useFormikContext<VehicleFormValues>();

  const imageListCol = useMemo(() => {
    let col = 2;
    if (isMdUp) {
      col = 5;
    }
    return col;
  }, [isMdUp]);

  const onDrop = useCallback(
    (acceptedFiles: File[] | undefined) => {
      if (acceptedFiles) {
        const currentImagesLength =
          (currentImages?.length || 0) + (values.images?.length || 0);
        const totalImagesLength = currentImagesLength + acceptedFiles.length;

        if (totalImagesLength > 10) {
          dispatch(
            setAlert({
              message: 'You have exceeded the maximum number of allowed images',
              severity: 'error',
            }),
          );
          return;
        }

        const updatedImages = values.images
          ? values.images.concat(acceptedFiles)
          : acceptedFiles;

        setFieldValue('images', updatedImages);
      }
    },
    [currentImages, values.images, setFieldValue, dispatch],
  );

  const onRemoveUploadedImages = useCallback(
    (index: number) => {
      const updatedImages = [...values.images];
      updatedImages.splice(index, 1);
      setFieldValue('images', updatedImages);
    },
    [setFieldValue, values.images],
  );

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
          color="secondary"
        >
          Images
        </Typography>

        <Divider />
      </Grid>

      <Grid xs={12}>
        <ImageList cols={imageListCol} rowHeight={125}>
          {currentImages &&
            currentImages.map((image, index) => (
              <ImageListItem
                key={image.key}
                sx={{
                  position: 'relative',
                }}
              >
                <img
                  loading="lazy"
                  alt={image.key}
                  srcSet={image.url}
                  src={image.url}
                  style={{ height: 120 }}
                />
                <IconButton
                  color="secondary"
                  onClick={() => onRemoveCurrentImages(index)}
                  sx={{ position: 'absolute', top: '1px', right: '1px' }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </ImageListItem>
            ))}
          {(!currentImages || currentImages.length === 0) &&
            (!values.images || values.images.length === 0) && (
              <ImageListItem key={`image-placeholder`}>
                <img
                  loading="lazy"
                  alt="img-placeholder"
                  srcSet={`../public/placeholder-image.png`}
                  src={'../public/placeholder-image.png'}
                  style={{ height: 120 }}
                />
              </ImageListItem>
            )}
          {values.images &&
            values.images.map((image: File, index: number) => (
              <ImageListItem
                key={`image-upload-${index}`}
                sx={{ position: 'relative' }}
              >
                <img
                  loading="lazy"
                  alt={`image-upload-${index}`}
                  srcSet={`${URL.createObjectURL(image)}`}
                  src={`${URL.createObjectURL(image)}`}
                  style={{ height: 120 }}
                />
                <IconButton
                  onClick={() => onRemoveUploadedImages(index)}
                  color="secondary"
                  sx={{ position: 'absolute', top: '1px', right: '1px' }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </ImageListItem>
            ))}
        </ImageList>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="subtitle2"
          textAlign="center"
          component="p"
          sx={{ mb: 1 }}
        >
          You can upload up to 10 images, each with a maximum size of 10MB. For
          optimal results, please use images with a 3:4 aspect ratio.
        </Typography>
        <Paper
          {...getRootProps()}
          sx={{
            height: 100,
            bgcolor: 'primary.light',
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
                Drag image here
                <br />
                - or -
                <br />
              </Typography>
              <Button
                size="small"
                component="label"
                tabIndex={-1}
                variant="outlined"
                color="inherit"
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
