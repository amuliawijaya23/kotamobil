import * as Yup from 'yup';

export const LoginFormSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export const RegisterFormSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().optional(),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Required'),
});

export const ForgotPasswordFormSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
});

export const ResetPasswordFormSchema = Yup.object({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords does not match')
    .required('Required'),
});

export const VehicleFormStepSchema = [
  Yup.object().shape({
    name: Yup.string().required('Required'),
    status: Yup.string().required('Required'),
    dateAdded: Yup.date().required('Required').nullable(),
    dateSold: Yup.date().when('status', {
      is: (value: string) => value === 'Sold',
      then: () => Yup.date().required('Required').nullable(),
      otherwise: () => Yup.date().nullable(),
    }),
    buyerId: Yup.string().when('status', {
      is: (value: string) => value === 'Sold',
      then: () => Yup.string().required('Required'),
      otherwise: () => Yup.string().nullable(),
    }),
    price: Yup.number().required('Required'),
    marketPrice: Yup.number().optional().nullable(),
    purchasePrice: Yup.number().optional().nullable(),
    soldPrice: Yup.number().when('status', {
      is: (value: string) => value === 'Sold',
      then: () => Yup.number().required('Sold price is required'),
      otherwise: () => Yup.string().optional().nullable(),
    }),
    condition: Yup.string().required('Required'),
    plateNumber: Yup.string().when('condition', {
      is: (value: string) => value === 'Used',
      then: () => Yup.string().required('Required'),
      otherwise: () => Yup.string().nullable(),
    }),
    taxDate: Yup.date().when('condition', {
      is: (value: string) => value === 'Used',
      then: () => Yup.date().required('Required').nullable(),
      otherwise: () => Yup.date().nullable(),
    }),
  }),
  Yup.object().shape({
    vin: Yup.string().required('Required'),
    make: Yup.string().required('Required'),
    model: Yup.string().required('Required'),
    bodyType: Yup.string().required('Required'),
    assembly: Yup.string().required('Required'),
    year: Yup.number().required('Required').nullable(),
    odometer: Yup.number().required('Required').nullable(),
    color: Yup.string().required('Required'),
    transmission: Yup.string().required('Required'),
    fuelType: Yup.string().required('Required'),
    description: Yup.string().optional(),
  }),
  Yup.object().shape({
    images: Yup.array().of(Yup.mixed()),
    removeImages: Yup.array().of(Yup.mixed()),
  }),
  Yup.object().shape({
    specification: Yup.array().of(Yup.string()),
  }),
];

export const ContactFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().optional(),
  country: Yup.string().required('Required'),
  mobile: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').optional(),
  address: Yup.string().optional(),
  instagram: Yup.string().url('Invalid Url').optional(),
  facebook: Yup.string().url('Invalid Url').optional(),
  linkedIn: Yup.string().url('Invalid Url').optional(),
  twitter: Yup.string().url('Invalid Url').optional(),
  updateId: Yup.string().url('Invalid Url').optional(),
});
