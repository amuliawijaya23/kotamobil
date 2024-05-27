import { Unstable_Grid2 as Grid, Box, Paper, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid container p={10} spacing={2} sx={{ mt: { xs: 5 } }}>
        <Grid xs={12} mb={5}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Welcome to Gudang Mobil
          </Typography>
          <Typography variant="h5" component="h2" textAlign="center">
            Simplifying Vehicle Management for Small Dealerships
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} p={2}>
          <Paper sx={{ p: 2, minHeight: 130, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
              Store Vehicle Information
            </Typography>
            <Typography variant="body1" textAlign="center">
              Easily input and manage detailed information for each vehicle in
              your inventory.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} p={2}>
          <Paper sx={{ p: 2, minHeight: 130, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
              Upload Pictures
            </Typography>
            <Typography variant="body1" textAlign="center">
              Showcase your vehicles with high-quality images. Upload up to 10
              images per vehicle.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} p={2}>
          <Paper sx={{ p: 2, minHeight: 130, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
              Track Vehicle Status
            </Typography>
            <Typography variant="body1" textAlign="center">
              Keep your inventory up-to-date by setting the status of each
              vehicle to "Available" or "Sold."
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} p={2}>
          <Paper sx={{ p: 2, minHeight: 130, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
              User-Friendly Interface
            </Typography>
            <Typography variant="body1" textAlign="center">
              Our platform is designed to be easy to use, ensuring that you can
              manage your inventory without any hassle.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
