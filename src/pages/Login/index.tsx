import { Unstable_Grid2 as Grid, Box, Button, Typography } from '@mui/material';

const Login = () => {
  return (
    <Grid
      container
      component={Box}
      sx={{
        height: '100vh',
      }}
    >
      <Grid xs={12} display="flex" alignItems="center" justifyContent="center">
        <Box
          component="form"
          sx={{
            width: { xs: '70%', sm: '45%', md: '35%', lg: '25%', xl: '15%' },
          }}
        >
          <Grid container>
            <Grid xs={12} spacing={2}>
              <Typography>Hello</Typography>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="contained">
                Sign In
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button fullWidth variant="contained">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
