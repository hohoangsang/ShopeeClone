import { type RegisterOptions, UseFormGetValues } from 'react-hook-form';

type RulesType = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions };

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
