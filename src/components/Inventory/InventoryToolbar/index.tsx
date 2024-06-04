import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getInventory,
  getQueryData,
  setSearch,
} from '~/redux/reducers/inventorySlice';

interface InventoryToolbarProps {
  onToggleFilter: () => void;
  onToggleForm: () => void;
}

const InventoryToolbar = ({
  onToggleFilter,
  onToggleForm,
}: InventoryToolbarProps) => {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector(getInventory);
  const queryData = useAppSelector(getQueryData);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleOnChangeSearch = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setSearch(event.target.value));
  };

  return (
    queryData && (
      <Toolbar
        component={Box}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container sx={{ width: '100%' }}>
          <Grid xs={3} sm={2} lg={1} display="flex" alignItems="center">
            <Typography>{`${inventory ? inventory?.length : 0} Vehicle${
              inventory && inventory?.length > 1 ? 's' : ''
            }`}</Typography>
          </Grid>
          <Grid
            xs={6}
            sm={8}
            lg={10}
            display="flex"
            alignItems="center"
            justifyContent="end"
          >
            <TextField
              size="small"
              placeholder="Search..."
              value={queryData?.search}
              onChange={handleOnChangeSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            xs={3}
            sm={2}
            lg={1}
            display="flex"
            justifyContent="end"
            alignItems="center"
          >
            <Box>
              <Tooltip title="Filter">
                <IconButton
                  onClick={onToggleFilter}
                  onMouseDown={handleMouseDown}
                >
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add listing">
                <IconButton
                  onClick={onToggleForm}
                  onMouseDown={handleMouseDown}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    )
  );
};

export default InventoryToolbar;
