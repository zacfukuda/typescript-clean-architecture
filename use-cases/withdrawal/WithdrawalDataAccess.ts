import { Transaction } from "./entities/Transaction";

export interface WithdrawalDataAccess {
  readLastTransaction(accountNumber: string): Promise<Transaction>;
  writeTransaction(accountNumber: string, transaction: Transaction): Promise<void>;
}
