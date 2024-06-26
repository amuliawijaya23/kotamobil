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
  background: {
    default: '#e1ebfe',
  },
  text: {
    primary: '#2e2e2e',
  },
  primary: {
    light: '#eff4fe',
    main: '#01579b',
    dark: '#9dabb1',
    contrastText: '#757575',
  },
  secondary: {
    light: '#ffac33',
    main: '#FF9800',
    dark: '#b26a00',
    contrastText: '#eeeeee',
  },
  success: {
    light: '#4caf50',
    main: '#43a047',
    dark: '#388e3c',
    contrastText: '#9e9e9e',
  },
  error: {
    light: '#c62828',
    main: '#d50000',
    dark: '#b71c1c',
    contrastText: '#9e9e9e',
  },
  warning: {
    light: '#ffeb3b',
    main: '#fdd835',
    dark: '#fbc02d',
    contrastText: '#9e9e9e',
  },
  info: {
    light: '#78909c',
    main: '#607d8b',
    dark: '#546e7a',
    contrastText: '#9e9e9e',
  },
};

const darkPaletteOptions = {
  background: {
    default: '#0c1012',
  },
  text: {
    primary: '#bdbdbd',
  },
  primary: {
    light: '#101010',
    main: '#0c1012',
    dark: '#080b0c',
    contrastText: '#bdbdbd',
  },
  secondary: {
    light: '#ffac33',
    main: '#FF9800',
    dark: '#b26a00',
    contrastText: '#eeeeee',
  },
  success: {
    light: '#4caf50',
    main: '#43a047',
    dark: '#388e3c',
    contrastText: '#9e9e9e',
  },
  error: {
    light: '#c62828',
    main: '#d50000',
    dark: '#b71c1c',
    contrastText: '#9e9e9e',
  },
  warning: {
    light: '#ffeb3b',
    main: '#fdd835',
    dark: '#fbc02d',
    contrastText: '#9e9e9e',
  },
  info: {
    light: '#78909c',
    main: '#607d8b',
    dark: '#546e7a',
    contrastText: '#9e9e9e',
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
    palette:
      theme === 'dark'
        ? {
            mode: 'dark',
            ...darkPaletteOptions,
          }
        : {
            mode: 'light',
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
