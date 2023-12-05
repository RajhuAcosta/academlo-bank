import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const signupSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a string',
      required_error: 'name is required',
    })
    .min(3, { message: 'name is too short' })
    .max(50, { message: 'name is too long' }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
});
const loginSchema = z.object({
  accountNumber: z
    .string({
      invalid_type_error: 'account number must be parsed into a string',
      required_error: 'account number is required',
    })
    .min(6, {
      message:
        'The recipient account number is too short. It should have at least 6 digits',
    })
    .max(16, { message: 'account number is too long' }),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: 'Password is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
});

export function validateUserSignup(data) {
  const result = signupSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateUserLogin(data) {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}
