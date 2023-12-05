import TransfersModel from './transfers.model.js';

export class TransfersServices {
  static async create(data) {
    return await TransfersModel.create(data);
  }
  static async findTransferBeingRecipient(id) {
    return await TransfersModel.findAll({
      where: {
        receiverUserId: id,
      },
    });
  }
  static async findTransferBeingSender(id) {
    return await TransfersModel.findAll({
      where: {
        senderUserId: id,
      },
    });
  }
}
