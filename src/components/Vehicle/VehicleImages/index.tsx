import { useMemo } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
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
  const isUltraUp = useMediaQuery(theme.breakpoints.up('ultra'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const imageListCol = useMemo(() => {
    let col = 1;
    if (isUltraUp) {
      col = 5;
    } else if (isXlUp) {
      col = 5;
    } else if (isLgUp) {
      col = 5;
    } else if (isSmUp) {
      col = 2;
    }
    return col;
  }, [isUltraUp, isXlUp, isLgUp, isSmUp]);

  return (
    <>
      {vehicle?.images && vehicle.images.length > 0 ? (
        <>
          <Grid xs={12}>
            <ImageList
              cols={imageListCol}
              rowHeight={250}
              sx={{
                minHeight: 250,
                maxHeight: 505,
              }}
            >
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
                      height: 245,
                      border: 'solid 1px',
                      objectFit: 'cover',
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </>
      ) : (
        <Grid xs={12}>
          <Box
            sx={{
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1" component="p" textAlign="center">
              This vehicle currently has no images. You can upload images using
              the form provided by clicking the Update button.
            </Typography>
          </Box>
        </Grid>
      )}
    </>
  );
};

export default VehicleImages;
