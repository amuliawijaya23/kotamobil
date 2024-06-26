import { useMemo } from 'react';
import {
  Unstable_Grid2 as Grid,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface VehicleImagesProps {
  onOpenImages: (index: number) => void;
}

const VehicleImages = ({ onOpenImages }: VehicleImagesProps) => {
  const vehicle = useAppSelector(getVehicleData);
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const imageListCol = useMemo(() => {
    let col = 2;
    if (isSmUp) {
      col = 5;
    }
    return col;
  }, [isSmUp]);

  return (
    <Paper sx={{ bgcolor: 'primary.light', mt: 5, width: '100%' }}>
      <Grid container p={1} spacing={2}>
        <Grid xs={12}>
          <Typography variant="h6" component="h6" color="secondary">
            Images
          </Typography>
        </Grid>
        <Grid xs={12}>
          {vehicle?.images && vehicle.images.length > 0 ? (
            <ImageList cols={imageListCol}>
              {vehicle?.images.map((image, index) => (
                <ImageListItem
                  key={`vehicle-display-image-${index}`}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => onOpenImages(index)}
                >
                  <img
                    loading="lazy"
                    alt={`image`}
                    srcSet={`${image.url}`}
                    src={`${image.url}`}
                    style={{
                      border: 'solid 1px',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          ) : (
            <Typography variant="body1" component="p" color="inherit">
              This vehicle currently has no images. You can upload images using
              the form provided by clicking the Update button.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VehicleImages;
