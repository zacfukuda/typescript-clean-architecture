import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cwd } from "node:process";
import { Pin } from "use-cases/withdrawal/entities/Pin";
import { Transaction } from "use-cases/withdrawal/entities/Transaction";
import type { WithdrawalDataAccess } from "use-cases/withdrawal/WithdrawalDataAccess";

export class WithdrawalFileSystemGateway implements WithdrawalDataAccess {
  async readPin(accountNumber: string): Promise<Pin> {
    const fileName = 'pin.txt';
    const filePath = path.resolve(cwd(), 'database', 'accounts', accountNumber, fileName);
    const content = await readFile(filePath, 'utf8');
    const number = content.trim();

    return new Pin(number);
  }

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

  async writeTransaction(accountNumber: string, transaction: Transaction): Promise<void> {
    const date = transaction.date.toISOString().slice(0,10);
    const debit = transaction.debit?.toFixed(2) ?? '';
    const credit = transaction.credit?.toFixed(2) ?? '';
    const balance = transaction.balance.toFixed(2);
    
    const newLine = [date, debit, credit, balance].join(',');
    const content = newLine + '\r\n';

    const fileName = 'transactions.csv';
    const filePath = path.resolve(cwd(), 'database', 'accounts', accountNumber, fileName);

    return await writeFile(filePath, content, { flag: 'a' });
  }
}
