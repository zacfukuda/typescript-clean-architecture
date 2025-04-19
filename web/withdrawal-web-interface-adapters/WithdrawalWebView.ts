import { WithdrawalWebViewModel } from "./WithdrawalWebViewModel";

export class WithdrawalWebView {
  render(withdrawalWebViewModel: WithdrawalWebViewModel): string {
    const balance = withdrawalWebViewModel.balance;

    return JSON.stringify({ balance });
  }
}
