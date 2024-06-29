import { useCallback, useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserProfile from './UserProfile';
import { useAppSelector } from '~/redux/store';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '~/redux/reducers/userSlice';
import { getTheme } from '~/redux/reducers/themeSlice';

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
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleToggleNavMenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    },
    [],
  );

  const handleCloseNavMenu = useCallback(() => {
    setAnchorEl(null);
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
                loading="lazy"
                src={
                  theme === 'light'
                    ? '/kotamobil-light.png'
                    : '/kotamobil-dark.png'
                }
                style={{ height: 50, marginRight: 10, cursor: 'pointer' }}
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
                onClick={handleToggleNavMenu}
                onMouseDown={handleMouseDown}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="navMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseNavMenu}
                disableScrollLock
                marginThreshold={0}
                sx={{
                  mt: 0.5,
                  display: { xs: user ? 'flex' : 'none', sm: 'none' },
                }}
                slotProps={{
                  paper: {
                    sx: {
                      width: '100%',
                      maxWidth: '100%',
                      left: 0,
                      right: 0,
                    },
                  },
                }}
              >
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
                      <>
                        <MenuItem
                          key={`${page}-menu-item`}
                          onClick={onClickHandler}
                          sx={{
                            justifyContent: 'center',
                          }}
                        >
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      </>
                    );
                  },
                )}
              </Menu>
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
    </>
  );
};

export default NavBar;
