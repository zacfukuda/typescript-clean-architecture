import { WithdrawalInputData } from "use-cases/withdrawal/WithdrawalInputData"
import type { WithdrawalInputBoundary } from "use-cases/withdrawal/WithdrawalInputBoundary";

export class WithdrawalCliController {
  constructor (
    private readonly withdrawalInputBoundary: WithdrawalInputBoundary
  ) {}

  async post(accountNumber: string, pin: string, amount: number): Promise<void> {
    const withdrawalInputData: WithdrawalInputData = new WithdrawalInputData(accountNumber, pin, amount);
    
    await this.withdrawalInputBoundary.handle(withdrawalInputData);
  }
}
