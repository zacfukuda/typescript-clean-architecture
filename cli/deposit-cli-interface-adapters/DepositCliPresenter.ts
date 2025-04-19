import type { DepositOutputData } from "../../use-cases/deposit/DepositOutputData";
import type { DepositOutputBoundary } from "../../use-cases/deposit/DepositOutputBoundary";
import { DepositCliViewModel } from "./DepositCliViewModel";

export class DepositCliPresenter implements DepositOutputBoundary {
  private viewModel: DepositCliViewModel;

  handle(depositOutputData: DepositOutputData) {
    const { balance } = depositOutputData;
    this.viewModel = new DepositCliViewModel(balance);    
  }

  result(): DepositCliViewModel {
    return this.viewModel;
  }
}
