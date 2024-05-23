import React from 'react';
import { Outlet } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Box,
  Paper,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '~/redux/store';
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

  const navigate = useNavigate();

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnClickLogin = () => {
    navigate('/login');
  };

  const handleOnClickRegister = () => {
    navigate('/register');
  };

  return (
    <Box component={Paper}>
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
              <Button
                onClick={handleOnClickLogin}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Login
              </Button>
              <Button
                onClick={handleOnClickRegister}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Register
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
      <Container component="main">
        <Toolbar />
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
