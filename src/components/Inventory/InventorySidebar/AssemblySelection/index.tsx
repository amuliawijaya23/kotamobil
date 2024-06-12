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
  updateAssemblySelections,
  selectAllAssembly,
} from '~/redux/reducers/inventorySlice';
import { assembly } from '~/helpers/AutocompleteAndSelectData';

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

const AssemblySelection = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleAssemblySelection = useCallback(
    (selectedAssembly: string) => {
      dispatch(updateAssemblySelections(selectedAssembly));
    },
    [dispatch],
  );

  const handleSelectAllAssemblyChange = useCallback(() => {
    dispatch(selectAllAssembly());
  }, [dispatch]);

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Assembly
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show-assembly-filter"
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
                  checked={
                    assembly.length === queryData.selectedAssembly.length
                  }
                  onChange={handleSelectAllAssemblyChange}
                />
              }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              {assembly.map((a) => (
                <FormControlLabel
                  key={`${a}-assembly-checkbox`}
                  value={a}
                  label={<Typography variant="subtitle2">{a}</Typography>}
                  control={
                    <Checkbox
                      color="secondary"
                      checked={queryData.selectedAssembly.includes(a)}
                      onChange={() => handleAssemblySelection(a)}
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

export default AssemblySelection;
