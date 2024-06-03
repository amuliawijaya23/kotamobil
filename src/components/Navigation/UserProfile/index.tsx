import { useState } from 'react';
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
import { useAppSelector } from '~/redux/store';
import { getUserData } from '~/redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  onLogout: () => Promise<boolean>;
}

const UserProfile = ({ onLogout }: UserProfileProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(getUserData);
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const profileId = open ? 'profile-menu' : undefined;

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleProfileOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(e.currentTarget);
  };

  const handleProfileClose = () => {
    setOpen(null);
  };

  const handleOnLogout = async () => {
    try {
      if (await onLogout()) {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Error occured while logging out:', error);
    }
  };

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
                onClick={index === 0 ? () => {} : handleOnLogout}
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
