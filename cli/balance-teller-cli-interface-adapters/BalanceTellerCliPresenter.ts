import type { BalanceTellerOutputData } from "use-cases/balance-teller/BalanceTellerOutputData";
import type { BalanceTellerOutputBoundary } from "use-cases/balance-teller/BalanceTellerOutputBoundary";
import { BalanceTellerCliViewModel } from "./BalanceTellerCliViewModel";

export class BalanceTellerCliPresenter implements BalanceTellerOutputBoundary {
  private viewModel: BalanceTellerCliViewModel;

  handle(balanceTellerOutputData: BalanceTellerOutputData) {
    const { balance } = balanceTellerOutputData;
    this.viewModel = new BalanceTellerCliViewModel(balance);    
  }

  result(): BalanceTellerCliViewModel {
    return this.viewModel;
  }
}
