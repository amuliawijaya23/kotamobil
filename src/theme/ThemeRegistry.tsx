import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const typographyOptions = {
  fontSize: 12,
  fontFamily: 'Roboto',
};

const paletteOptions = {
  primary: {
    main: '#002147',
  },
  secondary: {
    main: '#ffdf00',
  },
  success: {
    main: '#39ff14',
  },
  error: {
    main: '#ff2800',
  },
  warning: {
    main: '#ff6700',
  },
  info: {
    main: '#bf00ff',
  },
};

const darkTheme = createTheme({
  typography: typographyOptions,
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
    text: {
      primary: '#f5f5f5',
    },
    ...paletteOptions,
  },
});

const lightTheme = createTheme({
  typography: typographyOptions,
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
    text: {
      primary: '#343434',
    },
    ...paletteOptions,
  },
});

const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeRegistry;
