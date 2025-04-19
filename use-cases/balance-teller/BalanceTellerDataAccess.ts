import { Transaction } from "./entities";

export interface BalanceTellerDataAccess {
  readLastTransaction(accountNumber: string): Promise<Transaction>;
}
