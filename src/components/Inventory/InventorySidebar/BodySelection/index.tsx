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
  updateBodyTypeSelections,
  selectAllBodyType,
} from '~/redux/reducers/inventorySlice';
import { bodyType } from '~/helpers/selectData';

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

const BodySelection = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleBodyTypeSelection = (selectedBodyType: string) => {
    dispatch(updateBodyTypeSelections(selectedBodyType));
  };

  const handleSelectAllBodyTypeChange = () => {
    dispatch(selectAllBodyType());
  };

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Body Type
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show-body-filter"
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
                  checked={
                    bodyType.length === queryData?.selectedBodyType.length
                  }
                  onChange={handleSelectAllBodyTypeChange}
                />
              }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              {bodyType.map((b) => (
                <FormControlLabel
                  key={`${b}-bodyType-checkbox`}
                  value={b}
                  label={<Typography variant="subtitle2">{b}</Typography>}
                  control={
                    <Checkbox
                      checked={queryData.selectedBodyType.includes(b)}
                      onChange={() => handleBodyTypeSelection(b)}
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

export default BodySelection;
