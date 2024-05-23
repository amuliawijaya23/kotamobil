import React, { useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
  Drawer,
  Toolbar,
  Divider,
  Typography,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

import ColorLensIcon from '@mui/icons-material/ColorLens';

const Vehicles = () => {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Drawer open={open} onClose={handleCloseDrawer} anchor="left">
        <Toolbar />
        <Divider />
        <List>
          {['Make', 'Model', 'Year', 'Color'].map((text, index) => (
            <ListItem key={`${text}-drawer-item`} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container component={Box} p={3} spacing={2} mt={1}>
        <Grid xs={12}>
          <Toolbar
            component={Box}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography>5 Listings</Typography>
            </Box>
            <Box>
              <IconButton
                onClick={handleToggleDrawer}
                onMouseDown={handleMouseDown}
              >
                <FilterListIcon />
              </IconButton>
              <IconButton>
                <AddIcon />
              </IconButton>
            </Box>
          </Toolbar>
          <Divider />
        </Grid>
        <Grid xs={12} sm={4} lg={3} xl={2}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                src="./src/assets/coming-soon.jpg"
                height="250"
                alt="2017 Honda HR-V"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  2017 Honda HR-V
                </Typography>
                <Typography variant="body1">Honda HR-V Bekas</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Vehicles;
