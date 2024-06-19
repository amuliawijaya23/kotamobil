import { useCallback, useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import { useAppDispatch } from '~/redux/store';
import { useAppSelector } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '~/redux/reducers/userSlice';
import { getTheme, toggleTheme } from '~/redux/reducers/themeSlice';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

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
  const user = useAppSelector(getUserData);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleOpenNavMenu = useCallback(() => {
    setOpenMenu((open) => !open);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleOnClickHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleOnClickDashboard = useCallback(() => {
    navigate('/dashboard');
  }, [navigate]);

  const handleOnClickInventory = useCallback(() => {
    navigate('/inventory');
  }, [navigate]);

  const handleOnClickContacts = useCallback(() => {
    navigate('/contacts');
  }, [navigate]);

  const handleOnClickLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const handleOnClickRegister = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const toggleThemeMode = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                display: { xs: user ? 'none' : 'flex', sm: 'flex' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                onClick={handleOnClickHome}
                onMouseDown={handleMouseDown}
                src={
                  theme === 'light'
                    ? '/src/assets/gudangmobil-logo-dark.png'
                    : '/src/assets/gudangmobil-logo-light.png'
                }
                style={{ height: 40, marginRight: 10, cursor: 'pointer' }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: user ? 'flex' : 'none', sm: 'none' },
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', sm: user ? 'flex' : 'none' },
                alignItems: 'center',
              }}
            >
              {['Dashboard', 'Inventory', 'Contacts'].map((page, index) => {
                const onclickHandler = () => {
                  switch (index) {
                    case 0:
                      handleOnClickDashboard();
                      break;
                    case 1:
                      handleOnClickInventory();
                      break;
                    case 2:
                      handleOnClickContacts();
                      break;
                  }
                };
                return (
                  <Button
                    key={`app-bar-button-${page}`}
                    onClick={onclickHandler}
                    onMouseDown={handleMouseDown}
                    color="secondary"
                    variant="text"
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={toggleThemeMode}
              color="inherit"
              sx={{ mr: 2 }}
            >
              {theme === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {user && <UserProfile />}
            {!user && (
              <>
                <Button
                  onClick={handleOnClickLogin}
                  onMouseDown={handleMouseDown}
                  color="secondary"
                  variant="text"
                >
                  Login
                </Button>
                <Button
                  onClick={handleOnClickRegister}
                  onMouseDown={handleMouseDown}
                  color="secondary"
                  variant="text"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {openMenu && (
        <>
          <ClickAwayListener onClickAway={handleCloseNavMenu}>
            <Box
              sx={{
                display: { xs: user ? 'flex' : 'none', sm: 'none' },
                zIndex: 2,
                position: 'fixed',
                flexDirection: 'column',
                width: '100%',
                bgcolor: 'primary.light',
              }}
            >
              <Toolbar />
              <List sx={{ width: '100%' }} disablePadding>
                {['Home', 'Dashboard', 'Inventory', 'Contacts'].map(
                  (page, index) => {
                    const onClickHandler = () => {
                      switch (index) {
                        case 0:
                          handleOnClickHome();
                          handleCloseNavMenu();
                          break;
                        case 1:
                          handleOnClickDashboard();
                          handleCloseNavMenu();
                          break;
                        case 2:
                          handleOnClickInventory();
                          handleCloseNavMenu();
                          break;
                        case 3:
                          handleOnClickContacts();
                          handleCloseNavMenu();
                          break;
                      }
                    };
                    return (
                      <Box key={`${page}-menu-item`}>
                        <ListItemButton
                          onClick={onClickHandler}
                          onMouseDown={handleMouseDown}
                        >
                          <ListItemText
                            primary={page}
                            primaryTypographyProps={{
                              textAlign: 'center',
                              color: 'secondary',
                            }}
                          />
                        </ListItemButton>
                        <Divider />
                      </Box>
                    );
                  },
                )}
              </List>
            </Box>
          </ClickAwayListener>
        </>
      )}
    </>
  );
};

export default NavBar;
