import { useCallback } from 'react';
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
import { FieldArray, useFormikContext } from 'formik';

interface VehicleSpecificationsValues {
  specification: string[];
}

const VehicleSpecifications = () => {
  const { values, setFieldValue } =
    useFormikContext<VehicleSpecificationsValues>();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

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
              onClick={() =>
                setFieldValue('specification', [...values.specification, ''])
              }
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
      <FieldArray
        name="specification"
        render={(arrayHelpers) => (
          <>
            {values.specification.map((spec: string, index: number) => (
              <Grid key={`specification-form-${index}`} xs={12} sm={6}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                  }}
                >
                  <FormControl size="small" fullWidth>
                    <InputLabel
                      htmlFor={`outlined-vehicle-specification-${index}`}
                    >
                      Specification
                    </InputLabel>
                    <OutlinedInput
                      value={spec}
                      onChange={(e) =>
                        arrayHelpers.replace(index, e.target.value)
                      }
                      type="text"
                      label="Specification"
                      id={`outlined-vehicle-specification-${index}`}
                    />
                  </FormControl>
                  <Tooltip title="Remove specification">
                    <IconButton
                      onClick={() => arrayHelpers.remove(index)}
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
        )}
      />
    </>
  );
};

export default VehicleSpecifications;
