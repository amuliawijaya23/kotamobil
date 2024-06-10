import { useState, useCallback } from 'react';
import {
  IconButton,
  Avatar,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import StringAvatar from '~/components/StringAvatar';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getUserData, logoutUser } from '~/redux/reducers/userSlice';
import { resetInventory } from '~/redux/reducers/inventorySlice';
import { resetContacts } from '~/redux/reducers/contactsSlice';
import { resetDashboard } from '~/redux/reducers/dashboardSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUserData);
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const profileId = open ? 'profile-menu' : undefined;

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  const handleProfileOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(e.currentTarget);
    },
    [],
  );

  const handleProfileClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(resetInventory());
      dispatch(resetContacts());
      dispatch(resetDashboard());
      navigate('/login');
    } catch (error) {
      console.error(`Error logging out: ${error}`);
    }
  }, [dispatch, navigate]);

  return (
    <>
      <IconButton
        size="small"
        onClick={handleProfileOpen}
        onMouseDown={handleMouseDown}
      >
        {user?.picture ? (
          <Avatar src={user?.picture} sx={{ width: 40, height: 40 }} />
        ) : (
          <StringAvatar
            name={
              user
                ? user?.lastName
                  ? `${user?.firstName} ${user?.lastName}`
                  : user?.firstName
                : ''
            }
          />
        )}
      </IconButton>
      <Popover
        id={profileId}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <List disablePadding>
          {['Account', 'Logout'].map((title, index) => (
            <ListItem
              key={`${title}-profile-item`}
              disablePadding
              sx={{ display: 'block' }}
            >
              <ListItemButton
                onClick={index === 0 ? () => {} : handleLogout}
                sx={{ justifyContent: 'initial', px: 5 }}
              >
                <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
};

export default UserProfile;
