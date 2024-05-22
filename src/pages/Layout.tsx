import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Box,
  Paper,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '~/redux/store';

import { toggleTheme, getTheme } from '~/redux/reducers/themeSlice';
import { getUserData } from '~/redux/reducers/userSlice';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleSidebarOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Layout = () => {
  const user = useAppSelector(getUserData);
  const theme = useAppSelector(getTheme);

  const dispatch = useAppDispatch();

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box component={Paper} sx={{ display: 'flex' }}>
      <Container component={'header'}>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h6" noWrap component={'h1'}>
                GudangMobil
              </Typography>
            </Box>
            <Box>
              {/* <IconButton
                onClick={toggleThemeMode}
                color={theme === 'light' ? 'secondary' : 'info'}
              >
                {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton> */}
              <Button>
                <Typography>Login</Typography>
              </Button>
              <Button>
                <Typography>Register</Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
      <Container component={'main'} sx={{ minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
