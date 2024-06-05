import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAppSelector } from '~/redux/store';
import { getTheme } from '~/redux/reducers/themeSlice';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    ultra: true;
  }
}

const typographyOptions = {
  fontSize: 12,
  fontFamily: 'Roboto',
};

const paletteOptions = {
  primary: {
    light: '#dae7fe',
    main: '#C3D9FF',
    dark: '#c1d8fe',
    contrastText: '#757575',
  },
  secondary: {
    light: '#c62828',
    main: '#d50000',
    dark: '#b71c1c',
    contrastText: '#fff',
  },
  success: {
    light: '#4caf50',
    main: '#43a047',
    dark: '#388e3c',
    contrastText: '#fff',
  },
  error: {
    light: '#c62828',
    main: '#d50000',
    dark: '#b71c1c',
    contrastText: '#fff',
  },
  warning: {
    light: '#ffeb3b',
    main: '#fdd835',
    dark: '#fbc02d',
    contrastText: '#fff',
  },
  info: {
    light: '#78909c',
    main: '#607d8b',
    dark: '#546e7a',
    contrastText: '#fff',
  },
};

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector(getTheme);

  const appTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
        ultra: 2560,
      },
    },
    typography: typographyOptions,
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
      ...paletteOptions,
    },
  });

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
