import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Typography, Button, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';

import UserProfile from './UserProfile';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '~/redux/store';
import { getSession } from '~/redux/reducers/userSlice';

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

const NavBar = () => {
  const session = useAppSelector(getSession);

  const navigate = useNavigate();

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>,
  ) => {
    event.preventDefault();
  };

  const handleOnClickHome = () => {
    navigate('/');
  };

  const handleOnClickListings = () => {
    navigate('/listings');
  };

  const handleOnClickContacts = () => {
    navigate('/contacts');
  };

  const handleOnClickLogin = () => {
    navigate('/login');
  };

  const handleOnClickRegister = () => {
    navigate('/register');
  };

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            onClick={handleOnClickHome}
            onMouseDown={handleMouseDown}
            variant="h6"
            noWrap
            component={'h1'}
            sx={{
              cursor: 'pointer',
              display: {
                xs: session.isAuthenticated ? 'none' : 'flex',
                sm: 'flex',
              },
              mr: 3,
            }}
          >
            GudangMobil
          </Typography>
          <IconButton
            onClick={handleOnClickHome}
            onMouseDown={handleMouseDown}
            size="small"
            color="inherit"
            sx={{
              display: {
                xs: session.isAuthenticated ? 'flex' : 'none',
                sm: 'none',
              },
            }}
          >
            <HomeIcon />
          </IconButton>
          {session.isAuthenticated && (
            <>
              <Button
                onClick={handleOnClickListings}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Listings
              </Button>
              <Button
                onClick={handleOnClickContacts}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Contacts
              </Button>
            </>
          )}
        </Box>
        {session.isAuthenticated && (
          <Box>
            <UserProfile />
          </Box>
        )}
        {!session.isAuthenticated && (
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
