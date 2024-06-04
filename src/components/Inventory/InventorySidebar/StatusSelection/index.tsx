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
  updateStatusSelections,
  selectAllStatus,
} from '~/redux/reducers/inventorySlice';
import { status } from '~/helpers/selectData';

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

const StatusSelection = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleStatusSelection = (selectedstatus: string) => {
    dispatch(updateStatusSelections(selectedstatus));
  };

  const handleSelectAllStatusChange = () => {
    dispatch(selectAllStatus());
  };

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Status
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
                  checked={status.length === queryData.selectedStatus.length}
                  onChange={handleSelectAllStatusChange}
                />
              }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              {status.map((s) => (
                <FormControlLabel
                  key={`${s}-status-checkbox`}
                  value={s}
                  label={<Typography variant="subtitle2">{s}</Typography>}
                  control={
                    <Checkbox
                      checked={queryData.selectedStatus.includes(s)}
                      onChange={() => handleStatusSelection(s)}
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

export default StatusSelection;
