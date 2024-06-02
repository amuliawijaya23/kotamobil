import { useMemo } from 'react';
import { List, Divider } from '@mui/material';
import { useAppSelector } from '~/redux/store';
import { getQueryData } from '~/redux/reducers/inventorySlice';
import PriceSlider from './PriceSlider';
import YearSlider from './YearSlider';
import OdometerSlider from './OdometerSlider';
import MakeSelection from './MakeSelection';
import ModelSelection from './ModelSelection';
import ConditionSelection from './ConditionSelection';
import AssemblySelection from './AssemblySelection';
import BodySelection from './BodySelection';
import FuelSelection from './FuelSelection';
import TransmissionSelection from './TransmissionSelection';

const InventorySidebar = () => {
  const queryData = useAppSelector(getQueryData);

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

  return (
    <List>
      <PriceSlider />
      <Divider />
      <YearSlider />
      <Divider />
      <OdometerSlider />
      <Divider />
      <MakeSelection makes={makes} sortedMakes={sortedMakes} />
      <ModelSelection models={models} sortedMakes={sortedMakes} />
      <ConditionSelection />
      <AssemblySelection />
      <BodySelection />
      <FuelSelection />
      <TransmissionSelection />
    </List>
  );
};

export default InventorySidebar;
