import type { BalanceTellerInputBoundary } from "./BalanceTellerInputBoundary";
import type { BalanceTellerOutputBoundary } from "./BalanceTellerOutputBoundary";
import type { BalanceTellerDataAccess } from "./BalanceTellerDataAccess";
import { BalanceTellerInputData } from "./BalanceTellerInputData";
import { BalanceTellerOutputData } from "./BalanceTellerOutputData";

export class BalanceTellerInteractor implements BalanceTellerInputBoundary {  
  constructor(
    private readonly balanceTellerDataAccess: BalanceTellerDataAccess,
    private readonly balanceTellerOutputBoundary: BalanceTellerOutputBoundary
  ) {}

  async handle(balanceTellerInputData: BalanceTellerInputData): Promise<void> {
    const { accountNumber } = balanceTellerInputData;
    const transaction = await this.balanceTellerDataAccess.readLastTransaction(accountNumber);
    const balanceTellerOutputData = new BalanceTellerOutputData(accountNumber, transaction.balance);

    this.balanceTellerOutputBoundary.handle(balanceTellerOutputData);
  }
}
