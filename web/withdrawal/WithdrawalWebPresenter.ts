import type { WithdrawalOutputData } from "../../use-cases/withdrawal/WithdrawalOutputData";
import type { WithdrawalOutputBoundary } from "../../use-cases/withdrawal/WithdrawalOutputBoundary";
import { WithdrawalWebViewModel } from "./WithdrawalWebViewModel";

export class WithdrawalWebPresenter implements WithdrawalOutputBoundary {
  private viewModel: WithdrawalWebViewModel;

  handle(withdrawalOutputData: WithdrawalOutputData) {
    const { balance } = withdrawalOutputData;
    this.viewModel = new WithdrawalWebViewModel(balance);    
  }

  result(): WithdrawalWebViewModel {
    return this.viewModel;
  }
}
