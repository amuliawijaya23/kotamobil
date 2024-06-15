import React, { useEffect, useState, useCallback } from 'react';
import {
  Drawer,
  Toolbar,
  Unstable_Grid2 as Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import VehicleImages from './VehicleImages';
import VehicleStatus from './VehicleStatus';
import VehicleDetails from './VehicleDetails';
import VehicleSpecifications from './VehicleSpecifications';
import { useAppSelector, useAppDispatch } from '~/redux/store';
import { getVehicleData } from '~/redux/reducers/vehicleSlice';
import { setAlert, resetAlert } from '~/redux/reducers/appSlice';
import { FormikProvider, useFormik } from 'formik';
import { VehicleFormStepSchema } from '~/helpers/formSchema';
import { addVehicle, updateVehicle } from '~/redux/reducers/inventorySlice';

interface VehicleFormValues {
  name: string;
  status: string;
  dateAdded: Date | null;
  dateSold: Date | null;
  buyerId: string;
  price: number | null;
  marketPrice: number | null;
  purchasePrice: number | null;
  soldPrice: number | null;
  condition: string;
  plateNumber: string;
  taxDate: Date | null;
  vin: string;
  make: string;
  model: string;
  bodyType: string;
  assembly: string;
  year: number | null;
  odometer: number | null;
  color: string;
  transmission: string;
  fuelType: string;
  description: string;
  specification: string[];
  images: File[];
  removedImages: { key: string; url: string }[];
}

interface DataToSend
  extends Omit<VehicleFormValues, 'removedImages' | 'images'> {
  images?: { key: string; url: string }[];
}

const initialValues: VehicleFormValues = {
  name: '',
  status: 'Available',
  dateAdded: new Date(Date.now()),
  dateSold: null,
  buyerId: '',
  price: null,
  marketPrice: null,
  purchasePrice: null,
  soldPrice: null,
  condition: 'New',
  plateNumber: '',
  taxDate: null,
  vin: '',
  make: '',
  model: '',
  bodyType: '',
  assembly: 'Complete-Knock-Down',
  year: null,
  odometer: null,
  color: '',
  transmission: 'Automatic',
  fuelType: 'Petrol',
  description: '',
  specification: [''],
  images: [],
  removedImages: [],
};

const validateAllSteps = async (values: VehicleFormValues) => {
  for (let i = 0; i < VehicleFormStepSchema.length; i++) {
    try {
      await VehicleFormStepSchema[i].validate(values, { abortEarly: false });
    } catch (err) {
      return err;
    }
  }
  return null;
};

const filterObject = <T extends object>(obj: T): Partial<T> => {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key as keyof T];
    if (value !== undefined && value !== null && value !== '') {
      acc[key as keyof T] = value;
    }
    return acc;
  }, {} as Partial<T>);
};

interface VehicleFormProps {
  open: boolean;
  onCloseForm: () => void;
}

const VehicleForm = ({ open, onCloseForm }: VehicleFormProps) => {
  const dispatch = useAppDispatch();
  const vehicle = useAppSelector(getVehicleData);
  const [step, setStep] = useState<number>(0);
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<
    { key: string; url: string }[] | null
  >(vehicle?.images || null);

  const formik = useFormik<VehicleFormValues>({
    initialValues,
    validationSchema: VehicleFormStepSchema[step],
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();

        const { images, removedImages, ...data } = values;

        if (images) {
          (images as File[]).forEach((file) => {
            formData.append('images', file);
          });
        }

        const dataToSend: Partial<DataToSend> = filterObject(data);

        if (removedImages && removedImages.length > 0) {
          dataToSend.images = removedImages;
        }

        formData.set('data', JSON.stringify(dataToSend));

        const response = vehicle
          ? await dispatch(updateVehicle({ id: vehicle._id, formData }))
          : await dispatch(addVehicle(formData));

        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(
            setAlert({
              message: vehicle ? 'Vehicle Updated!' : 'Vehicle Created!',
              severity: 'success',
            }),
          );
          formik.resetForm();
          setStep(0);
          onCloseForm();
        }

        if (response.meta.requestStatus === 'rejected') {
          dispatch(
            setAlert({
              message: response.payload as string,
              severity: 'error',
            }),
          );
        }
      } catch (error) {
        console.error(`Error saving vehicle data: ${error}`);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    isSubmitting,
    touched,
    setTouched,
    setFieldValue,
    setValues,
    resetForm,
    validateForm,
    handleSubmit,
  } = formik;

  const initializeForm = useCallback(() => {
    if (vehicle) {
      setValues({
        name: vehicle.name,
        status: vehicle.sold ? 'Sold' : 'Available',
        dateAdded: vehicle.dateAdded || null,
        dateSold: vehicle.dateSold || null,
        buyerId: vehicle.buyerId || '',
        price: vehicle.price,
        marketPrice: vehicle.marketPrice || null,
        purchasePrice: vehicle.purchasePrice || null,
        soldPrice: vehicle.soldPrice || null,
        condition: vehicle.condition,
        plateNumber: vehicle.plateNumber || '',
        taxDate: vehicle.taxDate || null,
        vin: vehicle.vin,
        make: vehicle.make,
        model: vehicle.model,
        bodyType: vehicle.bodyType,
        assembly: vehicle.assembly,
        year: vehicle.year || null,
        odometer: vehicle.odometer || null,
        color: vehicle.color,
        transmission: vehicle.transmission,
        fuelType: vehicle.fuelType,
        description: vehicle.description || '',
        specification:
          vehicle.specification && vehicle.specification.length > 0
            ? vehicle.specification
            : [''],
        images: [], // Reset images on load
        removedImages: [],
      });
    }

    return () => {
      resetForm();
    };
  }, [vehicle, setValues, resetForm]);

  useEffect(initializeForm, [initializeForm]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    },
    [],
  );

  const onRemoveCurrentImages = useCallback(
    (index: number) => {
      if (currentImages) {
        const newCurrentImages = [...currentImages];
        const newRemovedImages = values.removedImages
          ? [...values.removedImages]
          : [];
        newRemovedImages.push(currentImages[index]);
        setFieldValue('removedImages', newRemovedImages);
        newCurrentImages.splice(index, 1);
        setCurrentImages(newCurrentImages);
      }
    },
    [setFieldValue, currentImages, values.removedImages],
  );

  const handleNextStep = useCallback(async () => {
    const isValid = await validateForm();
    if (Object.keys(isValid).length === 0) {
      setStep((step) => step + 1);
      dispatch(resetAlert());
    } else {
      const touchedFields: { [key: string]: boolean } = {};
      Object.keys(initialValues).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched({ ...touched, ...touchedFields });
      dispatch(
        setAlert({ message: 'Missing required parameters', severity: 'error' }),
      );
    }
  }, [touched, setTouched, dispatch, validateForm]);

  const handlePreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleOnOpenConfirmation = useCallback(async () => {
    const validationError = await validateAllSteps(values);
    if (validationError) {
      const touchedFields: { [key: string]: boolean } = {};
      Object.keys(initialValues).forEach((key) => {
        touchedFields[key] = true;
      });
      setTouched({ ...touched, ...touchedFields });
      dispatch(
        setAlert({
          message: 'Missing required parameters',
          severity: 'error',
        }),
      );
      return;
    }
    setOpenConfirmation(true);
  }, [values, touched, setTouched, dispatch]);

  const handleOnCloseConfirmation = useCallback(() => {
    setOpenConfirmation(false);
  }, []);

  const onClose = useCallback(() => {
    onCloseForm();
    setStep(0);
    vehicle ? initializeForm() : resetForm();
  }, [vehicle, onCloseForm, resetForm, initializeForm]);

  const onSave = useCallback(() => {
    handleOnCloseConfirmation();
    handleSubmit();
  }, [handleOnCloseConfirmation, handleSubmit]);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <VehicleStatus />;
      case 1:
        return <VehicleDetails />;
      case 2:
        return (
          <VehicleImages
            currentImages={currentImages}
            onRemoveCurrentImages={onRemoveCurrentImages}
          />
        );
      case 3:
        return <VehicleSpecifications />;
      default:
        return null;
    }
  };

  return (
    <FormikProvider value={formik}>
      <Dialog open={openConfirmation} onClose={handleOnCloseConfirmation}>
        <DialogTitle>
          {vehicle ? 'Update Vehicle' : 'Create Vehicle'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {vehicle
              ? 'Are you sure you want to update this vehicle?'
              : 'Are you sure you want to add this vehicle?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnCloseConfirmation} color="error">
            Cancel
          </Button>
          <Button onClick={onSave} onMouseDown={handleMouseDown} color="info">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{
          sx: {
            width: { xs: '60%', sm: '50%', lg: '40%', xl: '30%' },
            bgcolor: 'primary.light',
          },
        }}
      >
        <Toolbar />
        <Grid container p={3} spacing={3}>
          <Grid
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              onClick={onClose}
              onMouseDown={handleMouseDown}
              variant="text"
              color="error"
              sx={{ width: 50 }}
            >
              Cancel
            </Button>

            <LoadingButton
              loading={isSubmitting}
              onClick={handleOnOpenConfirmation}
              onMouseDown={handleMouseDown}
              variant="text"
              color="success"
              sx={{ width: 50 }}
              startIcon={<SaveIcon />}
            >
              Save
            </LoadingButton>
          </Grid>
          {renderStepContent(step)}
          <Grid
            xs={12}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              color="info"
              onClick={handlePreviousStep}
              onMouseDown={handleMouseDown}
              disabled={step === 0}
            >
              Back
            </Button>
            <Button
              color="info"
              onClick={handleNextStep}
              onMouseDown={handleMouseDown}
              disabled={step === 3}
            >
              {step === 2 &&
              values.images.length === 0 &&
              (!vehicle?.images || vehicle.images.length === 0)
                ? 'Skip'
                : 'Next'}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </FormikProvider>
  );
};

export default VehicleForm;
