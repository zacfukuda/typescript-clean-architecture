import type { WithdrawalOutputData } from "../../use-cases/withdrawal/WithdrawalOutputData";
import type { WithdrawalOutputBoundary } from "../../use-cases/withdrawal/WithdrawalOutputBoundary";
import { WithdrawalCliViewModel } from "./WithdrawalCliViewModel";

export class WithdrawalCliPresenter implements WithdrawalOutputBoundary {
  private viewModel: WithdrawalCliViewModel;

  handle(withdrawalOutputData: WithdrawalOutputData) {
    const { balance } = withdrawalOutputData;
    this.viewModel = new WithdrawalCliViewModel(balance);    
  }

  result(): WithdrawalCliViewModel {
    return this.viewModel;
  }
}
