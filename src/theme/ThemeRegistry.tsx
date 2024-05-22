import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useAppSelector } from '~/redux/store';
import { getTheme } from '~/redux/reducers/themeSlice';

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
    light: '#1976d2',
    main: '#1565c0',
    dark: '#0d47a1',
    contrastText: '#fff',
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
