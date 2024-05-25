import {
  Box,
  Divider,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  Tooltip,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  IconButton,
} from '@mui/material';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface VehicleSpecificationsProps {
  specification: string[];
  handleSpecificationChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => void;
  handleAddSpecification: () => void;
  handleRemoveSpecification: (index: number) => void;
}

const VehicleSpecifications = ({
  specification,
  handleSpecificationChange,
  handleAddSpecification,
  handleRemoveSpecification,
}: VehicleSpecificationsProps) => {
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
      {specification.map((spec, index) => (
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
            <IconButton
              onClick={() => handleRemoveSpecification(index)}
              onMouseDown={handleMouseDown}
              edge="end"
              size="small"
              color="inherit"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default VehicleSpecifications;
