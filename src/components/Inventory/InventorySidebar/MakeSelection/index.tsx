import { useState, useCallback } from 'react';
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
  updateMakeSelections,
  selectAllMakes,
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

interface MakeSelectionProps {
  makes: string[] | undefined;
  sortedMakes: string[] | undefined;
}

const MakeSelection = ({ makes, sortedMakes }: MakeSelectionProps) => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleMakeSelection = useCallback(
    (selectedMake: string) => {
      dispatch(updateMakeSelections(selectedMake));
    },
    [dispatch],
  );

  const handleSelectAllMakesChange = useCallback(() => {
    dispatch(selectAllMakes());
  }, [dispatch]);

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Makes
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show-makes-filter"
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
                  checked={makes?.length === queryData.selectedMakes.length}
                  onChange={handleSelectAllMakesChange}
                />
              }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              {sortedMakes &&
                sortedMakes.map((make) => (
                  <FormControlLabel
                    key={`${make}-checkbox`}
                    value={make}
                    label={<Typography variant="subtitle2">{make}</Typography>}
                    control={
                      <Checkbox
                        color="secondary"
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
      </>
    )
  );
};

export default MakeSelection;
