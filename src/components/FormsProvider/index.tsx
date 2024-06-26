import { createContext, useState, useCallback, ReactNode } from 'react';

interface FormsContextProps {
  openVehicleForm: boolean;
  openContactForm: boolean;
  handleToggleVehicleForm: () => void;
  handleCloseVehicleForm: () => void;
  handleToggleContactForm: () => void;
  handleCloseContactForm: () => void;
}

export const FormsContext = createContext<FormsContextProps | undefined>(
  undefined,
);

export const FormsProvider = ({ children }: { children: ReactNode }) => {
  const [openVehicleForm, setOpenVehicleForm] = useState<boolean>(false);
  const [openContactForm, setOpenContactForm] = useState<boolean>(false);

  const handleToggleVehicleForm = useCallback(
    () => setOpenVehicleForm((open) => !open),
    [],
  );

  const handleCloseVehicleForm = useCallback(
    () => setOpenVehicleForm(false),
    [],
  );

  const handleToggleContactForm = useCallback(
    () => setOpenContactForm((open) => !open),
    [],
  );

  const handleCloseContactForm = useCallback(
    () => setOpenContactForm(false),
    [],
  );

  return (
    <FormsContext.Provider
      value={{
        openVehicleForm,
        openContactForm,
        handleToggleVehicleForm,
        handleCloseVehicleForm,
        handleToggleContactForm,
        handleCloseContactForm,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};
