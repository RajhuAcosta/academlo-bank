import UsersModel from './users.model.js';

export class UsersServices {
  static async login(data) {
    return await UsersModel.findOne({
      where: {
        accountNumber: data.accountNumber,
        password: data.password,
        status: true,
      },
    });
  }
  static async findAllAccountNumbers(accountNumber) {
    return await UsersModel.findAll({
      where: {
        accountNumber: accountNumber,
      },
    });
  }
  static async create(data) {
    let accountNumber;
    let userWithAccountNumber;
    const assingAccountNumber = () => {
      accountNumber = Math.floor(Math.random() * 900000 + 100000).toString();
      data.accountNumber = accountNumber;
    };
    do {
      assingAccountNumber();
      userWithAccountNumber = await this.findAllAccountNumbers(accountNumber);
    } while (
      userWithAccountNumber === null ||
      userWithAccountNumber.length > 0
    );
    return await UsersModel.create(data);
  }
  static async findOneAccount(accountNumber) {
    return await UsersModel.findOne({
      where: {
        status: true,
        accountNumber: accountNumber,
      },
    });
  }
  static async findOneAccountById(id) {
    return await UsersModel.findOne({
      where: {
        status: true,
        id: id,
      },
    });
  }
  static async updateAmount(account, newAmount) {
    return await account.update({
      amount: newAmount,
    });
  }
}
