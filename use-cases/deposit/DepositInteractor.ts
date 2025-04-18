import type { DepositInputBoundary } from "./DepositInputBoundary";
import type { DepositOutputBoundary } from "./DepositOutputBoundary";
import { DepositInputData } from "./DepositInputData";
import { DepositOutputData } from "./DepositOutputData";
import { DepositDataAccess } from "./DepositDataAccess";
import { Transaction } from "./entities/Transaction";

export class DepositInteractor implements DepositInputBoundary {
  constructor(
    private readonly depositDataAccess: DepositDataAccess,
    private readonly depositOutputBoundary: DepositOutputBoundary
  ) {}

  async handle(depositInputData: DepositInputData): Promise<void> {
    const { accountNumber, amount } = depositInputData;
    const lastTransaction = await this.depositDataAccess.readLastTransaction(accountNumber);

    const date = new Date();
    const debit = amount;
    const credit = null;
    const balance = lastTransaction.balance + amount;
    const newTransaction = new Transaction(date, debit, credit, balance);
    const depositOutputData = new DepositOutputData(date, debit, credit, balance);

    await this.depositDataAccess.writeTransaction(accountNumber, newTransaction);
    this.depositOutputBoundary.handle(depositOutputData);
  }
}
