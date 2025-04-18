import { Transaction } from "./entities/Transaction";

export interface BalanceTellerDataAccess {
  readLastTransaction(accountNumber: string): Promise<Transaction>;
}
