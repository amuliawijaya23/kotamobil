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
  updateTransmissionSelections,
  selectAllTransmission,
} from '~/redux/reducers/inventorySlice';
import { transmission } from '~/helpers/selectData';

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

const TransmissionSelection = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleTransmissionSelection = (selectedTransmission: string) => {
    dispatch(updateTransmissionSelections(selectedTransmission));
  };

  const handleSelectAllTransmissionChange = () => {
    dispatch(selectAllTransmission());
  };

  return (
    queryData && (
      <>
        <ListItem>
          <ListItemText>
            <Typography variant="body1" fontWeight="bold">
              Transmission
            </Typography>
          </ListItemText>
          <ListItemIcon>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show-transmission-filter"
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
                    transmission.length ===
                    queryData.selectedTransmission.length
                  }
                  onChange={handleSelectAllTransmissionChange}
                />
              }
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
              {transmission.map((t) => (
                <FormControlLabel
                  key={`${t}-transmission-checkbox`}
                  value={t}
                  label={<Typography variant="subtitle2">{t}</Typography>}
                  control={
                    <Checkbox
                      checked={queryData.selectedTransmission.includes(t)}
                      onChange={() => handleTransmissionSelection(t)}
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

export default TransmissionSelection;
