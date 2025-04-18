import type { BalanceTellerOutputData } from "../../use-cases/balance-teller/BalanceTellerOutputData";
import type { BalanceTellerOutputBoundary } from "../../use-cases/balance-teller/BalanceTellerOutputBoundary";
import { BalanceTellerWebViewModel } from "./BalanceTellerWebViewModel";

export class BalanceTellerWebPresenter implements BalanceTellerOutputBoundary {
  private viewModel: BalanceTellerWebViewModel;

  handle(balanceTellerOutputData: BalanceTellerOutputData) {
    const { balance } = balanceTellerOutputData;
    this.viewModel = new BalanceTellerWebViewModel(balance);    
  }

  result(): BalanceTellerWebViewModel {
    return this.viewModel;
  }
}
