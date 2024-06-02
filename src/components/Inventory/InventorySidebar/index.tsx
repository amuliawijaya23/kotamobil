import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Slider,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import {
  getQueryData,
  updateMakeSelections,
  updateModelSelections,
  updatePriceRange,
  updateYearRange,
  updateOdometerRange,
  updateConditionSelections,
  updateAssemblySelections,
  updateBodyTypeSelections,
  updateFuelTypeSelections,
  updateTransmissionSelections,
  selectAllMakes,
  selectAllModels,
  selectAllCondition,
  selectAllAssembly,
  selectAllBodyType,
  selectAllFuelType,
  selectAllTransmission,
} from '~/redux/reducers/inventorySlice';
import { NumericFormat } from 'react-number-format';
import {
  condition,
  bodyType,
  assembly,
  fuelType,
  transmission,
} from '~/helpers/selectData';

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

const InventorySidebar = () => {
  const dispatch = useAppDispatch();
  const queryData = useAppSelector(getQueryData);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    makes: false,
    models: false,
    condition: false,
    assembly: false,
    bodyType: false,
    fueltYpe: false,
    transmission: false,
  });

  const makes = useMemo(() => {
    if (queryData) {
      return Object.keys(queryData.makesModels);
    }
  }, [queryData]);

  const models = useMemo(() => {
    if (queryData) {
      return queryData.selectedMakes.reduce<string[]>((acc, make) => {
        return [...acc, ...queryData.makesModels[make]];
      }, []);
    }
  }, [queryData]);

  const sortedMakes = useMemo(() => {
    if (makes) {
      return makes.sort();
    }
  }, [makes]);

  const handleExpandClick = (category: string) => {
    const state = { ...expanded };
    state[category] = !state[category];
    setExpanded(state);
  };

  const handleMakeSelection = (selectedMake: string) => {
    dispatch(updateMakeSelections(selectedMake));
  };

  const handleModelSelection = (selectedModel: string) => {
    dispatch(updateModelSelections(selectedModel));
  };

  const handleConditionSelection = (selectedCondition: string) => {
    dispatch(updateConditionSelections(selectedCondition));
  };

  const handleAssemblySelection = (selectedAssembly: string) => {
    dispatch(updateAssemblySelections(selectedAssembly));
  };

  const handleBodyTypeSelection = (selectedBodyType: string) => {
    dispatch(updateBodyTypeSelections(selectedBodyType));
  };

  const handleFuelTypeSelection = (selectedFuelType: string) => {
    dispatch(updateFuelTypeSelections(selectedFuelType));
  };

  const handleTransmissionSelection = (selectedTransmission: string) => {
    dispatch(updateTransmissionSelections(selectedTransmission));
  };

  const handleSelectAllMakesChange = () => {
    dispatch(selectAllMakes());
  };

  const handleSelectAllModelsChange = () => {
    dispatch(selectAllModels());
  };

  const handleSelectAllConditionChange = () => {
    dispatch(selectAllCondition());
  };

  const handleSelectAllAssemblyChange = () => {
    dispatch(selectAllAssembly());
  };

  const handleSelectAllBodyTypeChange = () => {
    dispatch(selectAllBodyType());
  };

  const handleSelectAllFuelTypeChange = () => {
    dispatch(selectAllFuelType());
  };

  const handleSelectAllTransmissionChange = () => {
    dispatch(selectAllTransmission());
  };

  const handlePriceRangeChange = (
    _event: Event,
    newValue: number | number[],
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    dispatch(updatePriceRange(newValue as number[]));
  };

  const handleYearRangeChange = (
    _event: Event,
    newValue: number | number[],
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    dispatch(updateYearRange(newValue as number[]));
  };

  const handleOdometerRangeChange = (
    _event: Event,
    newValue: number | number[],
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    dispatch(updateOdometerRange(newValue as number[]));
  };

  return queryData ? (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            Price
          </Typography>
        </ListItemText>
      </ListItem>
      <Grid container py={1} display="flex" justifyContent="center">
        <Grid xs={12} display="flex" justifyContent="center">
          <Slider
            aria-label="Always visible"
            valueLabelDisplay="off"
            value={queryData?.priceRange}
            onChange={handlePriceRangeChange}
            sx={{ width: 200 }}
            min={queryData.minPrice}
            max={queryData.maxPrice}
          />
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <NumericFormat
              displayType="text"
              value={queryData.priceRange[0]}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <span>&#8212;</span>
          </Typography>
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <NumericFormat
              displayType="text"
              value={queryData.priceRange[1]}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp "
            />
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <ListItem sx={{ mt: 1 }}>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            Year
          </Typography>
        </ListItemText>
      </ListItem>
      <Grid container py={2} display="flex" justifyContent="center">
        <Grid xs={12} display="flex" justifyContent="center">
          <Slider
            aria-label="Always visible"
            valueLabelDisplay="off"
            value={queryData.yearRange}
            onChange={handleYearRangeChange}
            sx={{ width: 200 }}
            min={queryData.minYear}
            max={queryData.maxYear}
          />
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            {queryData.yearRange[0]}
          </Typography>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <span>&#8212;</span>
          </Typography>
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            {queryData.yearRange[1]}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <ListItem sx={{ mt: 1 }}>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            Odometer
          </Typography>
        </ListItemText>
      </ListItem>
      <Grid container py={2} display="flex" justifyContent="center">
        <Grid xs={12} display="flex" justifyContent="center">
          <Slider
            aria-label="Always visible"
            valueLabelDisplay="off"
            value={queryData.odometerRange}
            onChange={handleOdometerRangeChange}
            sx={{ width: 200 }}
            min={queryData.minOdometer}
            max={queryData.maxOdometer}
          />
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <NumericFormat
              displayType="text"
              value={queryData.odometerRange[0]}
              thousandSeparator="."
              decimalSeparator=","
              suffix=" Km"
            />
          </Typography>
        </Grid>
        <Grid xs={2} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <span>&#8212;</span>
          </Typography>
        </Grid>
        <Grid xs={5} display="flex" justifyContent="center">
          <Typography variant="subtitle2" fontWeight="bold">
            <NumericFormat
              displayType="text"
              value={queryData.odometerRange[1]}
              thousandSeparator="."
              decimalSeparator=","
              suffix=" Km"
            />
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Makes
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.makes}
            onClick={() => handleExpandClick('makes')}
            aria-expanded={expanded.makes}
            aria-label="show-makes-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.makes} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
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
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Models
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.models}
            onClick={() => handleExpandClick('models')}
            aria-expanded={expanded.models}
            aria-label="show-models-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.models} unmountOnExit>
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
                checked={models?.length === queryData.selectedModels.length}
                onChange={handleSelectAllModelsChange}
              />
            }
          />
          {sortedMakes &&
            sortedMakes.map(
              (make) =>
                queryData.selectedMakes.includes(make) && (
                  <Box
                    key={`${make}-models-checkbox`}
                    sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}
                  >
                    <Typography variant="subtitle2">{make}</Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}
                    >
                      {queryData.makesModels[make].map((model) => (
                        <FormControlLabel
                          key={`${model}-checkbox`}
                          value={model}
                          label={
                            <Typography variant="subtitle2">{model}</Typography>
                          }
                          control={
                            <Checkbox
                              checked={queryData.selectedModels.includes(model)}
                              onChange={() => handleModelSelection(model)}
                            />
                          }
                        />
                      ))}
                    </Box>
                  </Box>
                ),
            )}
        </ListItem>
        <Divider />
      </Collapse>
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Condition
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.condition}
            onClick={() => handleExpandClick('condition')}
            aria-expanded={expanded.condition}
            aria-label="show-condition-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.condition} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
                checked={
                  condition.length === queryData.selectedCondition.length
                }
                onChange={handleSelectAllConditionChange}
              />
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
            {condition.map((c) => (
              <FormControlLabel
                key={`${c}-condition-checkbox`}
                value={c}
                label={<Typography variant="subtitle2">{c}</Typography>}
                control={
                  <Checkbox
                    checked={queryData.selectedCondition.includes(c)}
                    onChange={() => handleConditionSelection(c)}
                  />
                }
              />
            ))}
          </Box>
        </ListItem>
        <Divider />
      </Collapse>
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Assembly
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.assembly}
            onClick={() => handleExpandClick('assembly')}
            aria-expanded={expanded.assembly}
            aria-label="show-assembly-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.assembly} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
                checked={assembly.length === queryData.selectedAssembly.length}
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
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Body Type
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.bodyType}
            onClick={() => handleExpandClick('bodyType')}
            aria-expanded={expanded.bodyType}
            aria-label="show-body-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.bodyType} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
                checked={bodyType.length === queryData?.selectedBodyType.length}
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
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Fuel Type
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.fuelType}
            onClick={() => handleExpandClick('fuelType')}
            aria-expanded={expanded.fuelType}
            aria-label="show-fuel-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.fuelType} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
                checked={fuelType.length === queryData.selectedFuelType.length}
                onChange={handleSelectAllFuelTypeChange}
              />
            }
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 1 }}>
            {fuelType.map((f) => (
              <FormControlLabel
                key={`${f}-fuelType-checkbox`}
                value={f}
                label={<Typography variant="subtitle2">{f}</Typography>}
                control={
                  <Checkbox
                    checked={queryData.selectedFuelType.includes(f)}
                    onChange={() => handleFuelTypeSelection(f)}
                  />
                }
              />
            ))}
          </Box>
        </ListItem>
        <Divider />
      </Collapse>
      <ListItem>
        <ListItemText>
          <Typography variant="body1" fontWeight="bold">
            Transmission
          </Typography>
        </ListItemText>
        <ListItemIcon>
          <ExpandMore
            expand={expanded.transmission}
            onClick={() => handleExpandClick('transmission')}
            aria-expanded={expanded.transmission}
            aria-label="show-transmission-filter"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </ListItemIcon>
      </ListItem>
      <Divider />
      <Collapse in={expanded.transmission} unmountOnExit>
        <ListItem
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
        >
          <FormControlLabel
            label={<Typography variant="subtitle2">All</Typography>}
            control={
              <Checkbox
                checked={
                  transmission.length === queryData.selectedTransmission.length
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
    </List>
  ) : (
    <></>
  );
};

export default InventorySidebar;
