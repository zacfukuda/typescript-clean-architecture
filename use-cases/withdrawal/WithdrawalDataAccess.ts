import { Pin, Transaction } from "./entities";

export interface WithdrawalDataAccess {
  readPin(accountNumber: string): Promise<Pin>;
  readLastTransaction(accountNumber: string): Promise<Transaction>;
  writeTransaction(accountNumber: string, transaction: Transaction): Promise<void>;
}
