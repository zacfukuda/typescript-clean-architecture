import { Pin } from "./entities/Pin";
import { Transaction } from "./entities/Transaction";

export interface WithdrawalDataAccess {
  readPin(accountNumber: string): Promise<Pin>;
  readLastTransaction(accountNumber: string): Promise<Transaction>;
  writeTransaction(accountNumber: string, transaction: Transaction): Promise<void>;
}
