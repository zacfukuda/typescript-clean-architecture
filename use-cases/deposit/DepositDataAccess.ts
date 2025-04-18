import { Transaction } from "./entities/Transaction";

export interface DepositDataAccess {
  readLastTransaction(accountNumber: string): Promise<Transaction>;
  writeTransaction(accountNumber: string, transaction: Transaction): Promise<void>;
}
