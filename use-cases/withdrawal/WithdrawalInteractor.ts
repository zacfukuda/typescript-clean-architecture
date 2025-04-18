import type { WithdrawalInputBoundary } from "./WithdrawalInputBoundary";
import type { WithdrawalDataAccess } from "./WithdrawalDataAccess";
import type { WithdrawalOutputBoundary } from "./WithdrawalOutputBoundary";
import { WithdrawalInputData } from "./WithdrawalInputData";
import { WithdrawalOutputData } from "./WithdrawalOutputData";

import { Transaction } from "./entities/Transaction";

export class WithdrawalInteractor implements WithdrawalInputBoundary {
  constructor(
    private readonly withdrawalDataAccess: WithdrawalDataAccess,
    private readonly withdrawalOutputBoundary: WithdrawalOutputBoundary
  ) {}

  async handle(withdrawalInputData: WithdrawalInputData): Promise<void> {
    const { accountNumber, amount } = withdrawalInputData;
    const lastTransaction = await this.withdrawalDataAccess.readLastTransaction(accountNumber);

    if (lastTransaction.balance < amount) {
      throw new Error('InsufficientBalanceError');
    }

    const date = new Date();
    const debit = null;
    const credit = amount;
    const balance = lastTransaction.balance - amount;
    const newTransaction = new Transaction(date, debit, credit, balance);
    const withdrawalOutputData = new WithdrawalOutputData(date, debit, credit, balance);

    await this.withdrawalDataAccess.writeTransaction(accountNumber, newTransaction);
    this.withdrawalOutputBoundary.handle(withdrawalOutputData);
  }
}
