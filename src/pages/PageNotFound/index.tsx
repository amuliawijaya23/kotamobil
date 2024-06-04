import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Alert,
  ImageList,
  ImageListItem,
} from '@mui/material';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container sx={{ mt: 1 }}>
        <Grid xs={12}>
          <Paper>
            <Grid container>
              <Grid xs={12}>
                <ImageList
                  cols={1}
                  sx={{
                    backgroundColor: 'transparent',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ImageListItem sx={{ width: 400 }}>
                    <img src="/src/assets/404.png" alt="404" />
                  </ImageListItem>
                </ImageList>
              </Grid>
              <Grid xs={12}>
                <Box sx={{ padding: 2 }}>
                  <Alert severity="error">
                    <Typography variant="h6" component="div">
                      The page you're looking for does not exist!
                    </Typography>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageNotFound;
