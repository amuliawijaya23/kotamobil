import { Box, CircularProgress } from '@mui/material';
const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loading;
