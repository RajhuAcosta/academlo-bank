import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const transferSchema = z.object({
  amount: z
    .string({
      required_error: 'amount is required',
    })
    .max(7, { message: 'that amount is not allowed' }),
  recipientAccountNumber: z
    .string({
      required_error: 'recipient account number is required',
    })
    .min(6, {
      message:
        'The recipient account number is too short. It should have at least 6 digits',
    })
    .max(16, { message: 'recipient account number is too long' }),
  senderAccountNumber: z
    .string({
      required_error: 'sender account number is required',
    })
    .min(6, {
      message:
        'The sender account number is too short. It should have at least 6 digits',
    })
    .max(16, { message: 'sender account number is too long' }),
});

export function validateUserTransfer(data) {
  const result = transferSchema.safeParse(data);

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
