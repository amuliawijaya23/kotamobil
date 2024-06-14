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
        <Grid xs={12}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Welcome to Gudang Mobil
          </Typography>
          <Typography variant="h6" component="h2" textAlign="center">
            Simplifying Vehicle Management for Small Dealerships
          </Typography>
        </Grid>
        <Grid xs={12} mb={3}>
          <Typography variant="body1" component="p" textAlign="center">
            At Gudang Mobil, we understand the unique challenges faced by small
            dealerships. Our platform is designed to streamline and simplify
            every aspect of vehicle management, ensuring you can focus on what
            you do best—selling cars.
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} lg={3} p={2}>
          <Paper
            sx={{ p: 2, minHeight: 130, border: 'solid 1px', height: 200 }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Store Vehicle Information
            </Typography>
            <Typography variant="body1" textAlign="center">
              Effortlessly input and manage comprehensive details for each
              vehicle in your inventory. From make and model to color and
              mileage, keep all essential information at your fingertips.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} lg={3} p={2}>
          <Paper
            sx={{ p: 2, minHeight: 130, border: 'solid 1px', height: 200 }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Upload Pictures
            </Typography>
            <Typography variant="body1" textAlign="center">
              Enhance your listings with up to 10 high-resolution images per
              vehicle. Show potential buyers every angle and detail, making your
              inventory more attractive and professional.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} lg={3} p={2}>
          <Paper
            sx={{ p: 2, minHeight: 130, border: 'solid 1px', height: 200 }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Track Vehicle Status
            </Typography>
            <Typography variant="body1" textAlign="center">
              Stay organized and informed with our easy-to-use status tracking
              feature. Mark vehicles as "Available" or "Sold" to keep your
              inventory current and accurate.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={6} lg={3} p={2}>
          <Paper
            sx={{ p: 2, minHeight: 130, border: 'solid 1px', height: 200 }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              User-Friendly Interface
            </Typography>
            <Typography variant="body1" textAlign="center">
              Our platform is intuitively designed to provide a seamless
              experience. Whether you’re tech-savvy or new to digital tools,
              Gudang Mobil makes managing your inventory a breeze.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} mt={5}>
          <Typography variant="h5" component="h3" textAlign="center">
            Why Choose Gudang Mobil?
          </Typography>
        </Grid>
        <Grid xs={12} mb={2}>
          <Typography variant="body1" component="p" textAlign="center">
            Managing a vehicle inventory can be complex and time-consuming.
            Gudang Mobil simplifies the process with features that are tailored
            to the needs of small dealerships. Our platform is built to enhance
            your productivity, improve your inventory management, and ultimately
            drive more sales.
          </Typography>
        </Grid>
        <Grid xs={12} sm={4}>
          <Paper sx={{ p: 2, minHeight: 260, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Secure and Reliable
            </Typography>
            <Typography variant="body1" textAlign="center">
              Rest assured that your data is safe with us. We employ
              state-of-the-art security measures to protect your information and
              ensure its integrity.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={4}>
          <Paper sx={{ p: 2, minHeight: 260, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Real-Time Updates
            </Typography>
            <Typography variant="body1" textAlign="center">
              Stay informed with real-time updates. Any changes you make are
              instantly reflected across the platform, keeping your team in
              sync.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={4}>
          <Paper sx={{ p: 2, minHeight: 260, border: 'solid 1px' }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              Comprehensive Support
            </Typography>
            <Typography variant="body1" textAlign="center">
              Our dedicated support team is here to help you every step of the
              way. Access our resources and get personalized assistance whenever
              you need it.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} mt={5}>
          <Typography variant="body1" component="p" textAlign="center">
            At Gudang Mobil, we believe that managing your vehicle inventory
            should be straightforward and stress-free. Our platform is designed
            with you in mind, offering the tools you need to stay organized and
            focused on selling vehicles. Join us today and see how Gudang Mobil
            can transform the way you manage your dealership.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
