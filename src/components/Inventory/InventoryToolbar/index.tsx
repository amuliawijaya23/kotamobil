import { Box, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

import { useAppSelector } from '~/redux/store';
import { getInventory } from '~/redux/reducers/inventorySlice';

interface InventoryToolbarProps {
  onToggleFilter: () => void;
  onToggleForm: () => void;
}

const InventoryToolbar = ({
  onToggleFilter,
  onToggleForm,
}: InventoryToolbarProps) => {
  const inventory = useAppSelector(getInventory);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Toolbar
      component={Box}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography>{`${inventory ? inventory?.length : 0} Vehicle${
          inventory && inventory?.length > 1 ? 's' : ''
        }`}</Typography>
      </Box>
      <Box>
        <Tooltip title="Filter">
          <IconButton onClick={onToggleFilter} onMouseDown={handleMouseDown}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add listing">
          <IconButton onClick={onToggleForm} onMouseDown={handleMouseDown}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

export default InventoryToolbar;
