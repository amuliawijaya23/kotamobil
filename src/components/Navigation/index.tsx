import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Button, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';

import UserProfile from './UserProfile';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '~/redux/store';
import { useAppSelector } from '~/redux/store';
import { getAppStatus } from '~/redux/reducers/appSlice';
import { getTheme, toggleTheme } from '~/redux/reducers/themeSlice';

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

interface NavBarProps {
  onLogout: () => Promise<boolean>;
}

const NavBar = ({ onLogout }: NavBarProps) => {
  const { isAuthenticated } = useAppSelector(getAppStatus);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>,
  ) => {
    event.preventDefault();
  };

  const handleOnClickHome = () => {
    navigate('/');
  };

  const handleOnClickDashboard = () => {
    navigate('/dashboard');
  };

  const handleOnClickInventory = () => {
    navigate('/inventory');
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

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
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
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: { xs: isAuthenticated ? 'none' : 'flex', sm: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              onClick={handleOnClickHome}
              onMouseDown={handleMouseDown}
              src="/src/assets/gudangmobil.png"
              style={{ height: 50, marginRight: 10, cursor: 'pointer' }}
            />
          </Box>
          <IconButton
            onClick={handleOnClickHome}
            onMouseDown={handleMouseDown}
            size="small"
            color="inherit"
            sx={{
              display: {
                xs: isAuthenticated ? 'flex' : 'none',
                sm: 'none',
              },
            }}
          >
            <HomeIcon />
          </IconButton>
          {isAuthenticated && (
            <>
              <Button
                onClick={handleOnClickDashboard}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Dashboard
              </Button>
              <Button
                onClick={handleOnClickInventory}
                onMouseDown={handleMouseDown}
                color="inherit"
                variant="text"
              >
                Inventory
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleThemeMode} color="inherit" sx={{ mr: 2 }}>
            {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isAuthenticated && <UserProfile onLogout={onLogout} />}
          {!isAuthenticated && (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
