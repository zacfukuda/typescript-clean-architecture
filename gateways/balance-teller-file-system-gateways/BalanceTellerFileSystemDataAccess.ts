import { readFile } from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";
import { Transaction } from "../../use-cases/deposit/entities/Transaction";
import type { BalanceTellerDataAccess } from "../../use-cases/balance-teller/BalanceTellerDataAccess";

export class BalanceTellerFileSystemDataAccess implements BalanceTellerDataAccess {
  async readLastTransaction(accountNumber: string): Promise<Transaction> {
      const fileName = 'transactions.csv';
      const filePath = path.resolve(cwd(), 'database', 'accounts', accountNumber, fileName);
      const content = await readFile(filePath, 'utf8');
      const lines = content.trim().split('\n');
      const lastLine = lines[lines.length - 1];
      const fields = lastLine.split(',');
  
      const date = new Date(fields[0]);
      const debit = fields[1] ? Number(fields[1]) : null;
      const credit = fields[2] ? Number(fields[2]) : null;
      const balance = Number(fields[3]);
  
      return new Transaction(date, debit, credit, balance);
    }
}
