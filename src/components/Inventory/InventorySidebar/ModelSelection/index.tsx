import { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
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
  updateModelSelections,
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

interface ModelSelectionProps {
  models: string[] | undefined;
  sortedMakes: string[] | undefined;
}

const ModelSelection = ({ models, sortedMakes }: ModelSelectionProps) => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleModelSelection = (selectedModel: string) => {
    dispatch(updateModelSelections(selectedModel));
  };

  const handleSelectAllModelsChange = () => {
    dispatch(selectAllModels());
  };

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Models
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show-models-filter"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </ListItemIcon>
        </ListItem>
        <Divider />
        <Collapse in={expanded} unmountOnExit>
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
                  color="secondary"
                  checked={models?.length === queryData.selectedModels.length}
                  onChange={handleSelectAllModelsChange}
                />
              }
            />
            {sortedMakes &&
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
                        {queryData.makesModels[make].map((model) => (
                          <FormControlLabel
                            key={`${model}-checkbox`}
                            value={model}
                            label={
                              <Typography variant="subtitle2">
                                {model}
                              </Typography>
                            }
                            control={
                              <Checkbox
                                color="secondary"
                                checked={queryData.selectedModels.includes(
                                  model,
                                )}
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
          <Divider />
        </Collapse>
      </>
    )
  );
};

export default ModelSelection;
