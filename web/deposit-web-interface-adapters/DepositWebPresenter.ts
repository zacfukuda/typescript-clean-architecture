import type { DepositOutputData } from "../../use-cases/deposit/DepositOutputData";
import type { DepositOutputBoundary } from "../../use-cases/deposit/DepositOutputBoundary";
import { DepositWebViewModel } from "./DepositWebViewModel";

export class DepositWebPresenter implements DepositOutputBoundary {
  private viewModel: DepositWebViewModel;

  handle(depositOutputData: DepositOutputData) {
    const { balance } = depositOutputData;
    this.viewModel = new DepositWebViewModel(balance);    
  }

  result(): DepositWebViewModel {
    return this.viewModel;
  }
}
