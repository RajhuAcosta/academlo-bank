import { catchAsync } from '../../common/errors/catchAsync.js';
import { TransfersServices } from '../transfers/transfers.service.js';
import { validateUserLogin, validateUserSignup } from './users.schema.js';
import { UsersServices } from './users.services.js';

export const signup = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserSignup(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const user = await UsersServices.create(userData);
  return res.status(201).json({
    id: user.id,
    name: user.name,
    accountNumber: user.accountNumber,
  });
});
export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const userFinded = await UsersServices.login(userData);
  if (!userFinded) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid credentials',
    });
  }
  return res.status(201).json({
    status: 'success',
    message: 'Login successful',
    user: userFinded,
  });
});
export const getHistory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const findReciPromise = TransfersServices.findTransferBeingRecipient(id);
  const findSendPromise = TransfersServices.findTransferBeingSender(id);
  const [reciFinded, sendFinded] = await Promise.all([
    findReciPromise,
    findSendPromise,
  ]);
  return res.status(200).json({
    message: `You have made ${sendFinded.length} money transfers and received ${reciFinded.length} money transactions`,
    sendedTransactions: sendFinded,
    receivedTransactions: reciFinded,
  });
});
