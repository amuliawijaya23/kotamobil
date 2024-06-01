import { useState, useMemo } from 'react';
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

import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getQueryData,
  getInventory,
  updateMakeSelections,
  updateModelSelections,
  selectAllMakes,
  selectAllModels,
} from '~/redux/reducers/inventorySlice';

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
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(getInventory);
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    makes: false,
    models: false,
  });

  const makesWithModels = useMemo(() => {
    const makesModelsMap: { [key: string]: string[] } = {};
    inventory?.forEach((item) => {
      if (!makesModelsMap[item.make]) {
        makesModelsMap[item.make] = [];
      }
      if (!makesModelsMap[item.make].includes(item.model)) {
        makesModelsMap[item.make].push(item.model);
      }
    });
    Object.keys(makesModelsMap).forEach((make) => {
      makesModelsMap[make].sort();
    });
    return makesModelsMap;
  }, [inventory]);

  const sortedMakes = useMemo(() => {
    return Object.keys(makesWithModels).sort();
  }, [makesWithModels]);

  const selectedMakesModels = useMemo(() => {
    if (queryData) {
      return queryData.selectedMakes.reduce<string[]>((acc, make) => {
        return [...acc, ...makesWithModels[make]];
      }, []);
    }
  }, [makesWithModels, queryData]);

  const handleExpandClick = (category: string) => {
    const state = { ...expanded };
    state[category] = !state[category];
    setExpanded(state);
  };

  const handleMakeSelection = (make: string) => {
    dispatch(updateMakeSelections(make));
  };

  const handleModelSelection = (model: string) => {
    dispatch(updateModelSelections(model));
  };

  const handleSelectAllMakesChange = () => {
    dispatch(selectAllMakes());
  };

  const handleSelectAllModelsChange = () => {
    if (queryData && selectedMakesModels) {
      if (selectedMakesModels.length === queryData.selectedModels.length) {
        dispatch(selectAllModels([]));
      } else {
        dispatch(selectAllModels(selectedMakesModels));
      }
    }
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
            control={
              <Checkbox
                checked={
                  queryData?.makes.length === queryData?.selectedMakes.length
                }
                onChange={handleSelectAllMakesChange}
              />
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
            {makesWithModels &&
              queryData &&
              sortedMakes.map((make) => (
                <FormControlLabel
                  key={`${make}-checkbox`}
                  value={make}
                  label={<Typography variant="subtitle2">{make}</Typography>}
                  control={
                    <Checkbox
                      checked={queryData.selectedMakes.includes(make)}
                      onChange={() => handleMakeSelection(make)}
                    />
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
            control={
              <Checkbox
                checked={
                  selectedMakesModels?.length ===
                  queryData?.selectedModels.length
                }
                onChange={handleSelectAllModelsChange}
              />
            }
          />
          {makesWithModels &&
            queryData &&
            sortedMakes.map(
              (make) =>
                queryData.selectedMakes.includes(make) && (
                  <Box
                    key={`${make}-models-checkbox`}
                    sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}
                  >
                    <Typography variant="subtitle2">{make}</Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}
                    >
                      {makesWithModels[make].map((model) => (
                        <FormControlLabel
                          key={`${model}-checkbox`}
                          value={model}
                          label={
                            <Typography variant="subtitle2">{model}</Typography>
                          }
                          control={
                            <Checkbox
                              checked={queryData.selectedModels.includes(model)}
                              onChange={() => handleModelSelection(model)}
                            />
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                ),
            )}
        </ListItem>
      </Collapse>
    </List>
  );
};

export default InventorySidebar;
