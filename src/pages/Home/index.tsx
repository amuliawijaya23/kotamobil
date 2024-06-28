import {
  Unstable_Grid2 as Grid,
  Box,
  Paper,
  Typography,
  Toolbar,
  Link,
} from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { getTheme } from '~/redux/reducers/themeSlice';

const Home = () => {
  const theme = useAppSelector(getTheme);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
      }}
    >
      <Toolbar />
      <Grid
        container
        spacing={2}
        sx={{ p: { xs: 3, lg: 5, xl: 10 }, width: '100%' }}
      >
        <Grid
          xs={12}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: { xs: 2, md: 5 } }}
        >
          <img
            src={
              theme === 'light' ? '/kotamobil-light.png' : '/kotamobil-dark.png'
            }
            alt="logo"
            style={{ height: 150, marginBottom: 15 }}
          />
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            fontWeight="bold"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Simplifying Vehicle Management for Small Dealerships
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            At Kota Mobil, we understand the unique challenges faced by small
            dealerships. Our platform is designed to streamline and simplify
            every aspect of vehicle management, ensuring you can focus on what
            you do best—selling cars.
          </Typography>
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            p: { xs: 2, md: 5 },
            mt: { xs: 5, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="secondary">
            Store Vehicle Information
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Effortlessly input and manage comprehensive details for each vehicle
            in your inventory. From make and model to color and mileage, keep
            all essential information at your fingertips.
          </Typography>
          <img
            src="/features-create-vehicle.gif"
            alt="dashboard"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            p: { xs: 2, md: 5 },
            mt: { xs: 2, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="secondary">
            Track Vehicle Status
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Stay organized and informed with our easy-to-use status tracking
            feature. Mark vehicles as "Available" or "Sold" to keep your
            inventory current and accurate.
          </Typography>
          <img
            src="/features-search-vehicles.gif"
            alt="dashboard"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            p: { xs: 2, md: 5 },
            mt: { xs: 2, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="secondary">
            Manage Contacts
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Efficiently store and manage all your contacts in one place. Keep
            track of potential buyers, suppliers, and other important contacts
            with ease.
          </Typography>
          <img
            src="/features-create-contact.gif"
            alt="dashboard"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
          sx={{
            p: { xs: 2, md: 5 },
            mt: { xs: 2, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="secondary">
            View Sales Metrics
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Gain valuable insights into your sales performance. Analyze key
            metrics to make informed decisions and improve your sales
            strategies.
          </Typography>
          <img
            src="/features-dashboard.gif"
            alt="dashboard"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid xs={12} sx={{ mt: 5, mb: 2 }}>
          <Typography
            variant="h5"
            component="h3"
            textAlign="center"
            fontWeight="bold"
            color="secondary"
            sx={{ mb: 2 }}
          >
            Why Choose Kota Mobil?
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            Managing a vehicle inventory can be complex and time-consuming. Kota
            Mobil simplifies the process with features that are tailored to the
            needs of small dealerships. Our platform is built to enhance your
            productivity, improve your inventory management, and ultimately
            drive more sales.
          </Typography>
        </Grid>
        <Grid xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              minHeight: { xs: 175, sm: 250, md: 175 },
              border: 'solid 1px',
              bgcolor: 'primary.light',
            }}
          >
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
          <Paper
            sx={{
              p: 2,
              minHeight: { xs: 175, sm: 250, md: 175 },
              border: 'solid 1px',
              bgcolor: 'primary.light',
            }}
          >
            <Typography variant="h6" textAlign="center" sx={{ mb: 3 }}>
              User-Friendly Interface
            </Typography>
            <Typography variant="body1" textAlign="center">
              Our platform is intuitively designed to provide a seamless
              experience. Whether you’re tech-savvy or new to digital tools,
              Kota Mobil makes managing your inventory a breeze.
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={12} sm={4}>
          <Paper
            sx={{
              p: 2,
              minHeight: { xs: 175, sm: 250, md: 175 },
              border: 'solid 1px',
              bgcolor: 'primary.light',
            }}
          >
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
        <Grid xs={12} sx={{ mt: 10 }}>
          <Typography variant="body2" textAlign="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
              Kota Mobil
            </Link>
            {` ${new Date().getFullYear()}`}
          </Typography>
          <Typography variant="body2" textAlign="center">
            Kota Mobil, Jl. Pulo Armin B No.12, RT.04/RW.07, Baranangsiang, Kec.
            Bogor Tim., Kota Bogor, Jawa Barat 16143
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
