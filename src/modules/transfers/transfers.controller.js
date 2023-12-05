import { catchAsync } from '../../common/errors/catchAsync.js';
import { TransfersServices } from './transfers.service.js';
import { UsersServices } from '../users/users.services.js';
import { validateUserTransfer } from './transfers.schema.js';

export const doTransfers = catchAsync(async (req, res, next) => {
  const {
    hasError,
    errorMessages,
    userData: transferData,
  } = validateUserTransfer(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const recipientUserPromise = UsersServices.findOneAccount(
    transferData.recipientAccountNumber
  );
  const senderUserPromise = UsersServices.findOneAccount(
    transferData.senderAccountNumber
  );
  const [recipientUser, senderUser] = await Promise.all([
    recipientUserPromise,
    senderUserPromise,
  ]);
  if (!recipientUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Recipient account does not exist',
    });
  }
  if (!senderUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Sender account does not exist',
    });
  }
  if (transferData.amount > senderUser.amount) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient balance',
    });
  }
  const newRecipientBalance =
    parseFloat(transferData.amount) + parseFloat(recipientUser.amount);
  const newSenderBalance =
    parseFloat(senderUser.amount) - parseFloat(transferData.amount);
  const updateRecipientUserPromise = UsersServices.updateAmount(
    recipientUser,
    newRecipientBalance
  );
  const updateSenderUserPromise = UsersServices.updateAmount(
    senderUser,
    newSenderBalance
  );
  const transferPromise = TransfersServices.create({
    amount: transferData.amount,
    receiverUserId: recipientUser.id,
    senderUserId: senderUser.id,
  });
  await Promise.all([
    updateRecipientUserPromise,
    updateSenderUserPromise,
    transferPromise,
  ]);

  return res.status(201).json({
    status: 'success',
    message: 'Transfer completed',
  });
});
