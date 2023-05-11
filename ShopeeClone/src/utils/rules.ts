import { type RegisterOptions, UseFormGetValues } from 'react-hook-form';
import * as yup from 'yup';

type RulesType = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): RulesType => ({
  email: {
    required: {
      value: true,
      message: 'Please enter email!'
    },
    pattern: {
      value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Invalid email!'
    },
    maxLength: {
      value: 160,
      message: 'Length is 5-160 characters'
    },
    minLength: {
      value: 5,
      message: 'Length is 5-160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Please enter password!'
    },
    minLength: {
      value: 6,
      message: 'Length is 6-160 characters'
    },
    maxLength: {
      value: 160,
      message: 'Length is 6-160 characters'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Please enter confirm password!'
    },
    minLength: {
      value: 6,
      message: 'Length is 6-160 characters'
    },
    maxLength: {
      value: 160,
      message: 'Length is 6-160 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Confirm password not match with password!'
        : undefined
  }
});

export const schema = yup.object({
  email: yup
    .string()
    .required('Please enter email!')
    // .email('Invalid email!')
    .matches(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email!')
    .min(5, 'Length is 5-160 characters')
    .max(160, 'Length is 5-160 characters'),
  password: yup
    .string()
    .required('Please enter password!')
    .min(6, 'Length is 6-160 characters')
    .max(160, 'Length is 6-160 characters'),
  confirm_password: yup
    .string()
    .required('Please enter password!')
    .min(5, 'Length is 5-160 characters')
    .max(160, 'Length is 5-160 characters')
    .oneOf([yup.ref('password')], 'Confirm password not match with password!')
});

export const registerSchema = schema.pick(['email', 'password', 'confirm_password']);

export const loginSchema = schema.pick(['email', 'password']);

export type RegisterSchema = yup.InferType<typeof registerSchema>;

export type LoginSchema = yup.InferType<typeof loginSchema>;
