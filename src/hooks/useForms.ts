import { useContext } from 'react';
import { FormsContext } from '~/components/FormsProvider';

const useForms = () => {
  const context = useContext(FormsContext);

  if (!context) {
    throw new Error(`useForms must be used within a FormsProvider`);
  }
  return context;
};

export default useForms;
