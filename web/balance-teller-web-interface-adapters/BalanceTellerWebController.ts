import type { BalanceTellerInputData } from "use-cases/balance-teller/BalanceTellerInputData"
import type { BalanceTellerInputBoundary } from "use-cases/balance-teller/BalanceTellerInputBoundary";

export class BalanceTellerWebController {
  constructor (
    private readonly balanceTellerInputBoundary: BalanceTellerInputBoundary
  ) {}

  async get(accountNumber: string): Promise<void> {
    const balanceTellerInputData: BalanceTellerInputData = { accountNumber };
    
    await this.balanceTellerInputBoundary.handle(balanceTellerInputData);
  }
}
