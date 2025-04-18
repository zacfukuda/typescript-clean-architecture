import { DepositInputData } from "../../use-cases/deposit/DepositInputData"
import type { DepositInputBoundary } from "../../use-cases/deposit/DepositInputBoundary";

export class DepositCliController {
  constructor (
    private readonly depositInputBoundary: DepositInputBoundary
  ) {}

  async post(accountNumber: string, amount: number): Promise<void> {
    const depositInputData: DepositInputData = new DepositInputData(accountNumber, amount);
    
    await this.depositInputBoundary.handle(depositInputData);
  }
}
