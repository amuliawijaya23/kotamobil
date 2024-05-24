import { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useAppSelector } from '~/redux/store';
import { getQueryData } from '~/redux/reducers/inventorySlice';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const InventorySidebar = () => {
  const queryData = useAppSelector(getQueryData);

  const makes = queryData ? Object.keys(queryData.makes) : [];
  let models: string[] = [];

  for (const make of makes) {
    if (queryData?.makes[make].selected) {
      models = models.concat(Object.keys(queryData.makes[make].models));
    }
  }

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    makes: false,
    models: false,
  });

  const handleExpandClick = (category: string) => {
    const state = { ...expanded };
    state[category] = !state[category];
    setExpanded(state);
  };

  return (
    <List>
      <ListItem>
        <ListItemText>Makes</ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.makes}
            onClick={() => handleExpandClick('makes')}
            aria-expanded={expanded.makes}
            aria-label="show-makes-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.makes} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={<Checkbox checked />}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
            {queryData &&
              makes &&
              makes.map((make) => (
                <FormControlLabel
                  key={`${make}-checkbox`}
                  label={<Typography variant="subtitle2">{make}</Typography>}
                  control={
                    <Checkbox checked={queryData.makes[make].selected} />
                  }
                />
              ))}
          </Box>
        </ListItem>
        <Divider />
      </Collapse>
      <ListItem>
        <ListItemText>Models</ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.models}
            onClick={() => handleExpandClick('models')}
            aria-expanded={expanded.models}
            aria-label="show-models-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.models} unmountOnExit>
        <ListItem
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={<Checkbox checked />}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
            {queryData &&
              makes &&
              models &&
              models.map((model) => {
                let thisMake = '';

                for (const make of makes) {
                  if (model in queryData.makes[make].models) thisMake = make;
                }

                return (
                  <FormControlLabel
                    key={`${model}-checkbox`}
                    label={<Typography variant="subtitle2">{model}</Typography>}
                    control={
                      <Checkbox
                        checked={queryData.makes[thisMake].models[model]}
                      />
                    }
                  />
                );
              })}
          </Box>
        </ListItem>
      </Collapse>
    </List>
  );
};

export default InventorySidebar;
