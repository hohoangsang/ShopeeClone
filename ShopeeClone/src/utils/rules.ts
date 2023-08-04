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
    .oneOf([yup.ref('password')], 'Confirm password not match with password!'),
  price_min: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không hợp lệ',
    test: function (value) {
      const { price_max } = this.parent as { price_min: string; price_max: string };

      if (price_max !== '' && value !== '') {
        return Number(price_max) >= Number(value);
      }

      return price_max !== '' || value !== '';
    }
  }),
  price_max: yup.string().test({
    name: 'price-not-allow',
    message: 'Giá không phù hợp',
    test: function (value) {
      const { price_min } = this.parent as { price_min: string; price_max: string };

      if (price_min !== '' && value !== '') {
        return Number(price_min) <= Number(value);
      }

      return price_min !== '' || value !== '';
    }
  }),
  searchName: yup.string().trim().required('Not valid search name!')
});

export const userSchema = yup.object({
  name: yup.string().max(160, "Đồ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Đồ dài tối đa là 20 ký tự"),
  address: yup.string().max(20, "Đồ dài tối đa là 160 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Vui lòng chọn ngày trong quá khứ"),
  avatar: yup.string().max(1000, "Đồ dài tối đa là 1000 ký tự"),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: schema.fields['confirm_password'],
})

export type UserSchema = yup.InferType<typeof userSchema>;

export type Schema = yup.InferType<typeof schema>;
