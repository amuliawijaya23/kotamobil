import {
  Box,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  Tooltip,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@mui/material';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getVehicleFormData,
  setSpecification,
} from '~/redux/reducers/formSlice';

const VehicleSpecifications = () => {
  const vehicleFormData = useAppSelector(getVehicleFormData);

  const dispatch = useAppDispatch();

  const handleSpecificationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const specification = [...vehicleFormData.specification];
    specification[index] = event.target.value;
    dispatch(setSpecification(specification));
  };

  const handleAddSpecification = () => {
    const specification = [...vehicleFormData.specification];
    specification.push('');
    dispatch(setSpecification(specification));
  };

  const handleRemoveSpecification = (index: number) => {
    const specification = [...vehicleFormData.specification];
    specification.splice(index, 1);
    dispatch(setSpecification(specification));
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid xs={12}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            fontWeight="bold"
          >
            Vehicle Specifications
          </Typography>
          <Tooltip title="Add Specification">
            <IconButton
              onClick={handleAddSpecification}
              onMouseDown={handleMouseDown}
              color="inherit"
            >
              <AddCircleOutlineOutlinedIcon color="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
      </Grid>
      <Grid xs={12}>
        <Typography variant="subtitle2" component="p">
          Please list any vehicle specifications or features you would like to
          highlight. Click the "Add" button above to include more
          specifications.
        </Typography>
      </Grid>
      {vehicleFormData.specification.map((spec, index) => (
        <Grid key={`specification-form-${index}`} xs={12} sm={6}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
            }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel htmlFor="outlined-vehicle-specification">
                Specification
              </InputLabel>
              <OutlinedInput
                value={spec}
                onChange={(e) => handleSpecificationChange(e, index)}
                type="text"
                label="Specification"
              />
            </FormControl>
            <Tooltip title="Remove specification">
              <IconButton
                onClick={() => handleRemoveSpecification(index)}
                onMouseDown={handleMouseDown}
                edge="end"
                size="small"
                color="inherit"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default VehicleSpecifications;
