import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import { useAppSelector } from '../redux/store';

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
    main: '#002147',
    contrastText: '#ffffff',
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
    ...paletteOptions,
    text: {
      primary: '#f5f5f5',
      secondary: '#bf00ff',
    },
  },
});

const lightTheme = createTheme({
  typography: typographyOptions,
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
    },
    ...paletteOptions,
    text: {
      primary: '#000000',
      secondary: '#bf00ff',
    },
  },
});

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => {
  const theme = useAppSelector(getTheme);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};